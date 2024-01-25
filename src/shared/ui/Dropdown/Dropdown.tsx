import { classNames } from 'shared/lib/classNames/classNames';

import { Fragment, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { IconType } from 'react-icons';
import cls from './Dropdown.module.scss';

const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
];

export interface DropdownItem {
    value:string;
    content:ReactNode
}

interface DropdownProps {
    className?:string
    defaultValue?:string;
    value?:string;
    onChange?:(value:string)=> void;
    items:DropdownItem[];
    readonly?:boolean;
    Icon?:IconType

}

export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        defaultValue,
        value,
        onChange,
        readonly,
        items,
        Icon,
    } = props;
    return (
        <div className={classNames(cls.Dropdown, {}, [className])}>
            <Menu as="div">
                <Menu.Button as="button" className={cls.trigger}>
                    {' '}
                    {Icon ? (
                        <span className={cls.bodyText}>
                            {defaultValue}
                            <Icon className={cls.icon} />
                        </span>
                    ) : value || defaultValue}
                </Menu.Button>
                <Menu.Items className={cls.items}>
                    {items.map((item) => (
                        <Menu.Item key={item.value} as={Fragment}>
                            {({ active }) => (
                                <div className={classNames(
                                    cls.item,
                                    { [cls.active]: active },
                                    [],
                                )}
                                >
                                    {item.content}
                                </div>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>
        </div>
    );
};
