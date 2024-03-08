import { memo, ReactNode } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    TEXT = 'textBlock',
    ERROR = 'error',
    SECONDARY = 'secondary',
    DEFAULT = 'default',
}

export enum TextWeight {
    REGULAR = 'weightRegular',
    MEDIUM = 'weightMedium',
    SEMI = 'weightSemi',
}

export enum TextSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    BIG = 'big',
    LARGE = 'large',
}

export enum TextAlign {
    START = 'alignStart',
    CENTER = 'alignCenter',
    END = 'alignEnd',
}

type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

interface TextProps {
    className?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    weight?: TextWeight;
    As?: TagType;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        size = TextSize.MEDIUM,
        align = TextAlign.START,
        weight = TextWeight.REGULAR,
        As = 'p',
        theme = TextTheme.PRIMARY,
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls[size]]: true,
        [cls[align]]: true,
        [cls[weight]]: true,
    };

    return (
        <>{text && <As className={classNames(cls.Text, mods, [className])}>{text}</As>}</>
    );
});
