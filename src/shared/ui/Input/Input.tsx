import React, {
    forwardRef,
    InputHTMLAttributes,
    ReactNode,
    useCallback,
    useState,
} from 'react';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import view from 'shared/assets/icons/view.svg';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

export enum InputTheme {
    DEFAULT = 'default',
    CLEAR = 'clear',
    SECONDARY = 'secondary',
}

export enum InputTextAlign {
    DEFAULT = 'default',
    CENTER = 'center',
}

export enum InputTextSize {
    BIG = 'big',
    PRIMARY = 'primary',
    MEDIUM = 'medium',
}

export interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    label?: string;
    theme?: InputTheme;
    align?: InputTextAlign;
    textSize?: InputTextSize;
    type?: string;
    placeholder?: string;
    isError?: boolean;
    icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
    passwordButton?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        label,
        className,
        value = '',
        onChange,
        readonly,
        placeholder,
        type = 'text',
        theme = InputTheme.DEFAULT,
        align = InputTextAlign.DEFAULT,
        textSize = InputTextSize.PRIMARY,
        isError = false,
        icon,
        passwordButton,
        ...otherProps
    } = props;
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[textSize]]: true,
    };

    return (
        <div className={classNames(cls.body, { [cls.error]: isError }, [className])}>
            {label && (
                <label htmlFor={label} className={cls.label}>
                    {label}
                </label>
            )}
            <div className={cls.wrapperInput}>
                {icon && <Icon Svg={icon} hover={false} className={cls.icon} />}
                <input
                    ref={ref}
                    id={label}
                    readOnly={readonly}
                    className={classNames(cls.input, mods, [])}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                    value={value}
                    {...otherProps}
                />
                {passwordButton && passwordButton}
            </div>
        </div>
    );
});
