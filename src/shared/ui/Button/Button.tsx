import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
    PRIMARY = 'primary',
    CLEAR = 'clear',
    OUTLINE_RED = 'outline_red',
    LOADED = 'loaded',
}

export enum ButtonAlign {
    CENTER = 'center',
    START = 'start',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    children?: ReactNode;
    isLoading?: boolean;
    align?: ButtonAlign;
    borderRadius?: boolean;
    disabled?: boolean;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ThemeButton.PRIMARY,
        isLoading = false,
        align = ButtonAlign.CENTER,
        borderRadius = false,
        disabled = false,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls.border]: borderRadius,
        [cls.disabled]: disabled,
    };

    return (
        <button
            type="button"
            disabled={disabled}
            className={classNames(cls.Button, mods, [className])}
            {...otherProps}
        >
            {isLoading ? <Loader /> : children}
        </button>
    );
});
