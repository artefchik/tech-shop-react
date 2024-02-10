import { classNames, Mods } from 'shared/lib/classNames/classNames';

import React, {
    CSSProperties,
    Fragment,
    memo,
    ReactNode,
    useMemo,
} from 'react';
import { Menu } from '@headlessui/react';
import { Icon } from 'shared/ui/Icon/Icon';
import { Link } from 'react-router-dom';
import {
    DropdownsListDirectionOpen,
    DropdownsListDirectionOpenClasses,
} from '../../styles/const';
import cls from './Dropdown.module.scss';
import clsDrop from '../../styles/DropdownsList.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    items: DropdownItem[];
    readonly?: boolean;
    icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    open?: DropdownsListDirectionOpen;
    width?: string | number;
    height?: string | number;
    triggerClear?: boolean;
}

export const Dropdown = memo((props: DropdownProps) => {
    const {
        className,
        defaultValue,
        value,
        onChange,
        readonly,
        items,
        icon,
        open = 'bottom',
        width = 200,
        height = 90,
        triggerClear = false,
    } = props;

    const classes = useMemo(
        () => [className, DropdownsListDirectionOpenClasses[open]],
        [className, open],
    );

    const styles: CSSProperties = {
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
        padding: 0,
    };

    const mods: Mods = {
        [cls.clear]: triggerClear,
    };

    return (
        <Menu as="div" className={classNames(cls.Dropdown, mods, [className])}>
            <Menu.Button as="button" className={cls.trigger}>
                {icon ? (
                    <span className={clsDrop.bodyText}>
                        {defaultValue}
                        <Icon className={clsDrop.icon} Svg={icon} />
                    </span>
                ) : (
                    value || defaultValue
                )}
            </Menu.Button>
            <Menu.Items
                style={styles}
                className={classNames(clsDrop.body, {}, [
                    DropdownsListDirectionOpenClasses[open],
                ])}
            >
                {items.map((item, index) => {
                    if (item.href) {
                        return (
                            <Menu.Item
                                className={cls.item}
                                as={Link}
                                to={item.href}
                                key={index}
                            >
                                {item.content}
                            </Menu.Item>
                        );
                    }
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            onClick={item.onClick}
                            className={classNames(
                                cls.item,
                                { [cls.active]: active },
                                [],
                            )}
                        >
                            {item.content}
                        </button>
                    );

                    //
                    return (
                        <Menu.Item as={Fragment} key={index}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
});
