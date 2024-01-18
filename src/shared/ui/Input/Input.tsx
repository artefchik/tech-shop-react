import React, { InputHTMLAttributes, memo } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    label?:string,
}

export const Input = memo(
    (props: InputProps) => {
        const {
            label,
            id,
            className,
            value = '',
            onChange,
            readonly,
            placeholder,
            type = 'text',
            ...otherProps
        } = props;

        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        };

        const mods: Mods = {
            [cls.readonly]: readonly,
        };

        return (
            <div className={classNames(cls.body, mods, [className])}>
                {label && <label htmlFor={label} className={cls.label}>{label}</label>}
                <input
                    id={label}
                    readOnly={readonly}
                    className={cls.input}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChangeHandler}
                    value={value}
                    {...otherProps}
                />
            </div>
        );
    },
);
