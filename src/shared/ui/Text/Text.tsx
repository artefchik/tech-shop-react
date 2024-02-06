import { memo } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    HEADER = 'header',
    TEXT = 'textBlock',
    USER = 'user',
    SMALL = 'small',
    ERROR = 'error',
    PRICE = 'price',
    SECONDARY = 'secondary',
    SLIDER = 'slider',
}

export enum TextSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    DEFAULT = 'default',
    BIG = 'big',
    LINK = 'link',
}
export enum TextAlign {
    START = 'start',
    CENTER = 'center',
    END = 'end',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        size = TextSize.DEFAULT,
        align = TextAlign.START,
        theme = TextTheme.PRIMARY,
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[size]]: true,
        [cls[align]]: true,
    };

    return (
        <div className={classNames(cls.Text, mods, [className])}>
            {title && <div className={cls.title}>{title}</div>}
            {text && <div className={cls.text}>{text}</div>}
        </div>
    );
});
