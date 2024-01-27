import { Listbox } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { classNames } from 'shared/lib/classNames/classNames';
import { IconType } from 'react-icons';
import { DropdownsListDirectionOpenClasses } from '../../styles/const';
import cls from './Select.module.scss';
import clsDrop from '../../styles/DropdownsList.module.scss';

type SelectDirectionOpen = 'bottom'|'top'| 'topLeft' | 'bottomLeft'

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
        DropdownsListDirectionOpenClasses[open],
    ], [className, open]);

    return (

        <Listbox
            as="div"
            value={value}
            onChange={onChange}
            className={classNames(clsDrop.DropdownsList, {}, [className])}
        >
            <Listbox.Button
                as="button"
                className={classNames(
                    clsDrop.trigger,
                    {},
                    [className, cls.selectTrigger],
                )}
            >
                {Icon ? (
                    <span className={clsDrop.bodyText}>
                        {defaultValue}
                        <Icon className={clsDrop.icon} />
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
