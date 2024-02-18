import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { CSSProperties, InputHTMLAttributes, useMemo } from 'react';
import cls from './TextArea.module.scss';

type HTMLTextProps = Omit<
    InputHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'readOnly'
>;

export enum TextAreaTheme {
    DEFAULT = 'default',
    CLEAR = 'clear',
}

export enum TextAreaTextSize {
    SMALL = 'small',
    BIG = 'big',
    MEDIUM = 'medium',
}

interface TextAreaProps extends HTMLTextProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    height?: number;
    theme?: TextAreaTheme;
    textSize?: TextAreaTextSize;
}

export const TextArea = (props: TextAreaProps) => {
    const {
        className,
        value = '',
        onChange,
        placeholder,
        height,
        theme = TextAreaTheme.CLEAR,
        textSize = TextAreaTextSize.SMALL,
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };
    const mods: Mods = {
        [cls[theme]]: true,
        [cls[textSize]]: true,
    };

    const heightArea = height ?? Math.ceil((value.length + 1) / 120);

    return (
        <textarea
            onChange={onChangeHandler}
            value={value}
            placeholder={placeholder}
            rows={heightArea}
            className={classNames(cls.TextArea, mods, [className])}
        />
    );
};
