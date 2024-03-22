import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Checkbox } from 'shared/ui/Checkbox';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { confirmEmail } from 'features/ConfirmEmail/model/services/confirmEmail';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { Modal } from 'shared/ui/Modal/Modal';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import cls from './ConfirmEmail.module.scss';

interface ConfirmEmailProps {
    className?: string;
}

export const ConfirmEmail = (props: ConfirmEmailProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { isOpenModal, onCloseModal, onShowModal } = useToggleModal();
    const userData = useSelector(getUserAuthData);

    const text = userData?.isActivatedEmail
        ? t('Email confirmed')
        : t('Confirm email');

    const confirm = useCallback(async () => {
        if (!userData?.isActivatedEmail) {
            const result = await dispatch(confirmEmail());

            if (result.meta.requestStatus === 'fulfilled') {
                onShowModal();
            }
        }
    }, [dispatch, onShowModal, userData?.isActivatedEmail]);

    return (
        <>
            <div
                onClick={confirm}
                className={classNames(cls.ConfirmEmail, {}, [className])}
            >
                <Checkbox
                    checked={userData?.isActivatedEmail}
                    id="activatedEmail"
                />
                <Text text={text} />
            </div>

            <Modal isOpen={isOpenModal} onClose={onCloseModal}>
                <VStack gap="5">
                    <Text
                        text={t(
                            'A confirmation link has been sent to your email',
                        )}
                    />
                    <Text theme={TextTheme.LINKCOLOR} text={userData?.email} />
                </VStack>
            </Modal>
        </>
    );
};
