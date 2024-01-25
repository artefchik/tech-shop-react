import { Listbox } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { classNames } from 'shared/lib/classNames/classNames';
import { IconType } from 'react-icons';
import cls from './Select.module.scss';

type SelectDirectionOpen = 'bottom'|'top'

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
    Icon?:IconType;
    open?:SelectDirectionOpen

}
const SelectDirectionOpenClasses : Record<SelectDirectionOpen, string> = {
    top: cls.topOpen,
    bottom: cls.bottomOpen,
};

export const Select = (props: SelectProps) => {
    const {
        className,
        defaultValue,
        value,
        onChange,
        items,
        readonly,
        Icon,
        open = 'bottom',
    } = props;

    const classes = useMemo(() => [
        className,
        SelectDirectionOpenClasses[open],

    ], [className, open]);

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
                ) : defaultValue || value }
            </Listbox.Button>
            <Listbox.Options
                as="div"
                className={
                    classNames(cls.options, {}, classes)
                }
            >
                {items?.map((item) => (

                    <Listbox.Option key={item.value} value={item.value} as={Fragment}>
                        {({ active, selected }) => (
                            <li
                                className={classNames(cls.item, { [cls.active]: active, [cls.selected]: selected })}
                            >
                                {selected && <FaCheck />}
                                {item.content}
                            </li>
                        )}
                    </Listbox.Option>
                ))}
            </Listbox.Options>
        </Listbox>
    );
};
