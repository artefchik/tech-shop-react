import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { Suspense } from 'react';
import cls from './LoginModal.module.scss';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;

}

export const LoginModal = (props: LoginModalProps) => {
    const {
        className,
        isOpen,
        onClose,

    } = props;
    return (
        <Modal
            lazy
            isOpen={isOpen}
            onClose={onClose}
            className={classNames(cls.LoginModal, {}, [className])}
        >
            <Suspense fallback={<div>.....</div>}>
                <LoginFormAsync onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};
