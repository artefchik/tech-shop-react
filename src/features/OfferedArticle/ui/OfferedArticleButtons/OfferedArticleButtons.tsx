import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { publishAnOfferedArticle } from 'features/OfferedArticle/model/services/publishAnOfferedArticle/publishAnOfferedArticle';
import { rejectAnOfferedArticle } from 'features/OfferedArticle/model/services/rejectAnOfferedArticle/rejectAnOfferedArticle';
import { Modal } from 'shared/ui/Modal/Modal';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { getIsAdminRole, getUserAuthData } from 'entities/User';
import { use } from 'i18next';
import { Article } from 'entities/Article';
import { OfferedArticle } from 'features/OfferedArticle';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import {
    getRoutePathArticlesEditById,
    getRoutePathMain,
} from 'shared/const/router';

interface OfferedArticleButtonsProps {
    className?: string;
    article?: OfferedArticle;
    isRejected?: boolean;
}

export const OfferedArticleButtons = (props: OfferedArticleButtonsProps) => {
    const { className, article, isRejected } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { isOpenModal, onCloseModal, onShowModal } = useToggleModal();
    const [text, setText] = useState('');

    const isAdmin = useSelector(getIsAdminRole);
    const userData = useSelector(getUserAuthData);

    const publishAnArticle = useCallback(() => {
        dispatch(publishAnOfferedArticle(article?.id ?? ''));
    }, [article?.id, dispatch]);

    const rejectAnArticle = useCallback(
        (text: string) => {
            dispatch(rejectAnOfferedArticle({ id: article?.id ?? '', text }));
            onCloseModal();
        },
        [article?.id, dispatch, onCloseModal],
    );

    let content;

    if (isAdmin) {
        content = (
            <HStack className={className} gap="30">
                <Button disabled={isRejected} onClick={onShowModal}>
                    {t('Reject')}
                </Button>
                <Button onClick={publishAnArticle}>{t('Publish')}</Button>
                {isOpenModal && (
                    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
                        <VStack gap="10">
                            <Input
                                value={text}
                                onChange={setText}
                                placeholder={t(
                                    'The reason for the refusal to publish',
                                )}
                            />
                            <Button onClick={() => rejectAnArticle(text)}>
                                {t('Submit')}
                            </Button>
                        </VStack>
                    </Modal>
                )}
            </HStack>
        );
    } else if (userData?.id === article?.user.id && article?.rejected) {
        content = (
            <div>
                <AppLink to={getRoutePathArticlesEditById(article?.id ?? '')}>
                    {t('Edit')}
                </AppLink>
            </div>
        );
    }

    return <>{content}</>;
};
