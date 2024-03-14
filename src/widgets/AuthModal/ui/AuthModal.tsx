import { Modal } from 'shared/ui/Modal/Modal';
import { Suspense, useState } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { SignUpFormAsync } from 'features/SignUpByEmail';
import { LoginFormAsync } from 'features/LoginByEmail';

interface AuthModalProps {
    className?: string;
    isOpen?: boolean;
    onClose: () => void;
}

export const AuthModal = (props: AuthModalProps) => {
    const { className, isOpen, onClose } = props;

    const [currentForm, setCurrentForm] = useState(true);

    const onChangeForm = () => {
        setCurrentForm((prevState) => !prevState);
    };

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose} className={className}>
            {currentForm ? (
                <Suspense fallback="">
                    <LoginFormAsync onSuccess={onClose} onChangeForm={onChangeForm} />
                </Suspense>
            ) : (
                <Suspense fallback="">
                    <SignUpFormAsync onSuccess={onClose} onChangeForm={onChangeForm} />
                </Suspense>
            )}
        </Modal>
    );
};
