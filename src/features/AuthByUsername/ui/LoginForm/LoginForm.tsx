import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { loginReducer } from 'features/AuthByUsername';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { Text, TextSize, TextAlign } from 'shared/ui/Text/Text';
import cls from './LoginForm.module.scss';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginStateByUsername } from '../../model/selectors/getLoginStateByUsername/getLoginStateByUsername';
import { getLoginStateByPassword } from '../../model/selectors/getLoginStateByPassword/getLoginStateByPassword';
import { loginActions } from '../../model/slice/loginSlice';

interface LoginFormProps {
    className?: string;
}

const LoginForm = memo((props: LoginFormProps) => {
    const {
        className,
    } = props;

    const dispatch = useAppDispatch();

    const username = useSelector(getLoginStateByUsername);
    const password = useSelector(getLoginStateByPassword);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({
            username,
            password,
        }));
    }, [dispatch, password, username]);

    return (
        <DynamicModelLoader name="login" reducer={loginReducer}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text align={TextAlign.CENTER} title="Authorization" size={TextSize.BIG} className={cls.title} />
                <Input label="Username" onChange={onChangeUsername} value={username} />
                <Input label="Password" onChange={onChangePassword} value={password} />
                <Button onClick={onLoginClick} type="button">submit</Button>
            </div>
        </DynamicModelLoader>
    );
});
export default LoginForm;
