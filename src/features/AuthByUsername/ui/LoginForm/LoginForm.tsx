import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { signupByEmail } from 'features/AuthByUsername/model/services/signupByEmail/signupByEmail';
import { getLoginStateByEmail } from '../../model/selectors/getLoginStateByEmail/getLoginStateByEmail';
import { getLoginStateError } from '../../model/selectors/getLoginStateError/getLoginStateError';
import { getLoginStateIsLoading } from '../../model/selectors/getLoginStateIsLoading/getLoginStateIsLoading';
import cls from './LoginForm.module.scss';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginStateByUsername } from '../../model/selectors/getLoginStateByUsername/getLoginStateByUsername';
import { getLoginStateByPassword } from '../../model/selectors/getLoginStateByPassword/getLoginStateByPassword';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
}

const reducers: ReducersList = {
    login: loginReducer,
};

const loginOptions: TabItem[] = [
    {
        value: 'registration',
        content: 'Registration',
    },
    {
        value: 'authorization',
        content: 'Authorization',
    },
];

const LoginForm = memo((props: LoginFormProps) => {
    const { className, onSuccess } = props;

    const dispatch = useAppDispatch();

    const username = useSelector(getLoginStateByUsername);
    const password = useSelector(getLoginStateByPassword);
    const email = useSelector(getLoginStateByEmail);
    const isLoading = useSelector(getLoginStateIsLoading);
    const error = useSelector(getLoginStateError);

    const [loginOption, setLoginOption] = useState(loginOptions[0].value);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(loginActions.setEmail(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(
            loginByUsername({
                email,
                password,
            }),
        );

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [dispatch, email, onSuccess, password]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onLoginClick();
            }
        },
        [onLoginClick],
    );

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    const onTabClick = useCallback((tab: TabItem) => {
        setLoginOption(tab.value);
    }, []);

    const onSighupClick = useCallback(() => {
        dispatch(
            signupByEmail({
                username,
                email,
                password,
            }),
        );
    }, [dispatch, email, password, username]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="20" className={classNames(cls.LoginForm, {}, [className])}>
                <Text
                    size={TextSize.BIG}
                    align={TextAlign.CENTER}
                    text={loginOption}
                    As="h3"
                />

                <Tabs
                    name="auth"
                    tabs={loginOptions}
                    onTabClick={onTabClick}
                    value={loginOption}
                />
                {error && <Text theme={TextTheme.ERROR} text={error} />}
                <VStack gap="15">
                    <Input
                        label="Username"
                        onChange={onChangeUsername}
                        value={username}
                    />
                    <Input label="Email" onChange={onChangeEmail} value={email} />
                    <Input
                        label="Password"
                        onChange={onChangePassword}
                        value={password}
                    />
                </VStack>
                <Button
                    isLoading={isLoading}
                    className={cls.button}
                    onClick={onSighupClick}
                    type="button"
                >
                    submit
                </Button>
            </VStack>
        </DynamicModuleLoader>
    );
});
export default LoginForm;
