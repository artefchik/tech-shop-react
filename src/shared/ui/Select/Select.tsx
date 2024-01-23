import { Listbox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { classNames } from 'shared/lib/classNames/classNames';
import { IconType } from 'react-icons';
import cls from './Select.module.scss';

interface SelectItem {
    value:string;
    content:ReactNode
}

interface SelectProps {
    className?:string
    defaultValue?:string;
    value?:string;
    onChange?:(value:string)=> void;
    items:SelectItem[];
    readonly?:boolean;
    Icon?:IconType

}

export const Select = (props: SelectProps) => {
    const {
        className,
        defaultValue,
        value,
        onChange,
        items,
        readonly,
        Icon,
    } = props;

    return (

        <Listbox
            as="div"
            value={value}
            onChange={onChange}
            className={classNames(cls.Select, {}, [className])}
        >
            <Listbox.Button as="button" className={cls.trigger}>
                {Icon ? (
                    <span className={cls.bodyText}>
                        {defaultValue}
                        <Icon className={cls.icon} />
                    </span>
                ) : value || defaultValue }
            </Listbox.Button>
            <Listbox.Options as="div" className={cls.options}>
                {items?.map((item) => (

                    <Listbox.Option key={item.value} value={item.value} as={Fragment}>
                        {({ active, selected }) => (
                            <li
                                className={classNames(cls.item, { [cls.active]: active, [cls.selected]: selected })}
                            >
                                {selected && <FaCheck />}
                                {item.value}
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
};
