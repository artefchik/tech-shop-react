import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ThemeButton {
    PRIMARY = 'primary',
    CLEAR = 'clear',
    OUTLINE = 'outline'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ThemeButton.PRIMARY,
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            className={classNames(cls.Button, { [cls[theme]]: true }, [className])}
            {...otherProps}
        >
            {children}
        </button>
    );
});
