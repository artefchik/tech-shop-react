import { Input, InputProps } from 'shared/ui/Input/Input';
import { forwardRef, useCallback, useState } from 'react';
import castleIcon from 'shared/assets/icons/castle.svg';
import view from 'shared/assets/icons/view.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PasswordInput.module.scss';

type PasswordInputProps = Omit<InputProps, 'type'>;

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const [isPassword, setIsPassword] = useState(true);

    const type = isPassword ? 'password' : 'text';

    const onChangeTypeInput = useCallback(() => {
        setIsPassword((prevState) => !prevState);
    }, []);
    return (
        <Input
            ref={ref}
            type={type}
            icon={castleIcon}
            passwordButton={
                <Button
                    theme={ThemeButton.CLEAR}
                    onClick={onChangeTypeInput}
                    className={classNames(cls.button, { [cls.view]: isPassword }, [])}
                >
                    <Icon Svg={view} hover={false} />
                </Button>
            }
            {...props}
        />
    );
});
