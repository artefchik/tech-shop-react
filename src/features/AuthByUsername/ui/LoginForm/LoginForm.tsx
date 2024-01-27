import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { getLoginStateError } from '../../model/selectors/getLoginStateError/getLoginStateError';
import { getLoginStateIsLoading } from '../../model/selectors/getLoginStateIsLoading/getLoginStateIsLoading';
import cls from './LoginForm.module.scss';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginStateByUsername } from '../../model/selectors/getLoginStateByUsername/getLoginStateByUsername';
import { getLoginStateByPassword } from '../../model/selectors/getLoginStateByPassword/getLoginStateByPassword';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';

interface LoginFormProps {
    className?: string;
    onSuccess?:()=>void
}

const LoginForm = memo((props: LoginFormProps) => {
    const {
        className,
        onSuccess,
    } = props;

    const dispatch = useAppDispatch();

    const username = useSelector(getLoginStateByUsername);
    const password = useSelector(getLoginStateByPassword);
    const isLoading = useSelector(getLoginStateIsLoading);
    const error = useSelector(getLoginStateError);
    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({
            username,
            password,
        }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.();
        }
    }, [dispatch, onSuccess, password, username]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onLoginClick();
        }
    }, [onLoginClick]);

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    return (
        <DynamicModelLoader name="login" reducer={loginReducer}>
            <VStack gap="25" className={classNames(cls.LoginForm, {}, [className])}>
                <Text align={TextAlign.CENTER} title="Authorization" className={cls.title} />
                {error && <Text theme={TextTheme.ERROR} title={error} />}
                <VStack gap="20">
                    <Input label="Username" onChange={onChangeUsername} value={username} />
                    <Input label="Password" onChange={onChangePassword} value={password} />
                </VStack>
                <Button
                    isLoading={isLoading}
                    className={cls.button}
                    onClick={onLoginClick}
                    type="button"
                >
                    submit
                </Button>
            </VStack>
        </DynamicModelLoader>
    );
});
export default LoginForm;
