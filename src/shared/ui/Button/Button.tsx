import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
    PRIMARY = 'primary',
    CLEAR = 'clear',
    OUTLINE_RED = 'outline_red',
    LOADED = 'loaded'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    children?: ReactNode;
    isLoading?:boolean
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ThemeButton.PRIMARY,
        isLoading = false,
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            disabled={isLoading}
            className={classNames(cls.Button, { [cls[theme]]: true }, [className])}
            {...otherProps}
        >
            {isLoading ? <Loader /> : children }
        </button>
    );
});
