import { classNames } from 'shared/lib/classNames/classNames';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import cls from './Checkbox.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
>;

interface CheckboxProps extends HTMLInputProps {
    className?: string;
    id: string;
    checked?: boolean;
    onChange?: (value: boolean) => void;
}

export const Checkbox = (props: CheckboxProps) => {
    const { className, id, checked, onChange } = props;
    const [isCurrentChecked, setIsCurrentChecked] = useState(checked ?? false);
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            setIsCurrentChecked((prevState) => !prevState);
            onChange(isCurrentChecked);
        }
    };
    useEffect(() => {
        console.log(isCurrentChecked);
    }, [isCurrentChecked]);
    return (
        <div
            className={classNames(
                cls.Checkbox,
                { [cls.checked]: isCurrentChecked },
                [className],
            )}
        >
            <input
                type="checkbox"
                id={id}
                className={cls.input}
                checked={checked}
                onChange={onChangeHandler}
            />
            <label htmlFor={id} className={cls.label} />
        </div>
    );
};
