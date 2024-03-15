import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { AuthModal } from 'widgets/AuthModal/ui/AuthModal';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { Suspense, useCallback, useState } from 'react';
import { LoginFormAsync } from 'features/LoginByEmail';
import { SignUpFormAsync } from 'features/SignUpByEmail';
import { HStack } from 'shared/ui/Stack';
import { useNavigate } from 'react-router-dom';
import { getRoutePathMain } from 'shared/const/router';
import cls from './AuthPage.module.scss';

interface AuthPageProps {
    className?: string;
}

const AuthPage = (props: AuthPageProps) => {
    const { className } = props;
    const navigate = useNavigate();
    const [currentForm, setCurrentForm] = useState(true);

    const onChangeForm = () => {
        setCurrentForm((prevState) => !prevState);
    };

    const onCloseHandler = useCallback(() => {
        navigate(getRoutePathMain());
    }, [navigate]);

    return (
        <Page className={classNames(cls.AuthPage, {}, [className])}>
            <Container width={500}>
                {currentForm ? (
                    <Suspense fallback="">
                        <LoginFormAsync
                            onSuccess={onCloseHandler}
                            onChangeForm={onChangeForm}
                        />
                    </Suspense>
                ) : (
                    <Suspense fallback="">
                        <SignUpFormAsync
                            onSuccess={onCloseHandler}
                            onChangeForm={onChangeForm}
                        />
                    </Suspense>
                )}
            </Container>
        </Page>
    );
};

export default AuthPage;
