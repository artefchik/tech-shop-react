import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { publishAnOfferedArticle } from 'features/OfferedArticle/model/services/publishAnOfferedArticle/publishAnOfferedArticle';

interface OfferedArticleButtonsProps {
    className?: string;
    articleId: string;
}

export const OfferedArticleButtons = (props: OfferedArticleButtonsProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const publishAnArticle = useCallback(() => {
        dispatch(publishAnOfferedArticle(articleId));
    }, [dispatch]);

    return (
        <HStack className={className}>
            <Button onClick={publishAnArticle}>{t('Publish')}</Button>
        </HStack>
    );
};
