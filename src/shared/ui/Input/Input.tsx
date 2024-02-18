import React, { InputHTMLAttributes, memo } from 'react';
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

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    label?: string;
    theme?: InputTheme;
    align?: InputTextAlign;
    textSize?: InputTextSize;
}

export const Input = memo((props: InputProps) => {
    const {
        label,
        id,
        className,
        value = '',
        onChange,
        readonly,
        placeholder,
        type = 'text',
        theme = InputTheme.DEFAULT,
        align = InputTextAlign.DEFAULT,
        textSize = InputTextSize.PRIMARY,
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
        <div className={classNames(cls.body, mods, [className])}>
            {label && (
                <label htmlFor={label} className={cls.label}>
                    {label}
                </label>
            )}
            <input
                id={label}
                readOnly={readonly}
                className={classNames(cls.input, mods, [])}
                type={type}
                placeholder={placeholder}
                onChange={onChangeHandler}
                value={value}
                {...otherProps}
            />
        </div>
    );
});
