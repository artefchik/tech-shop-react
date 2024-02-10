import { classNames } from 'shared/lib/classNames/classNames';
import React, { CSSProperties, InputHTMLAttributes } from 'react';
import cls from './TextArea.module.scss';

type HTMLTextProps = Omit<
    InputHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface TextAreaProps extends HTMLTextProps {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    height?: number;
}

export const TextArea = (props: TextAreaProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        height = 1,
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={classNames(cls.TextArea, {}, [className])}>
            <textarea
                onChange={onChangeHandler}
                value={value}
                placeholder={placeholder}
                rows={height}
            />
        </div>
    );
};
