import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { IconType } from 'react-icons';
import { memo, ReactNode } from 'react';
import cls from './Icon.module.scss';

export enum IconSize {
    SMALL = 'small',
    MEDIUM= 'medium',
    BIG = 'big'
}

interface IconProps {
    className?: string;
    size?:IconSize
    icon:IconType
}

export const Icon = memo((props: IconProps) => {
    const {
        className,
        size = IconSize.BIG,
        icon,
    } = props;

    const mods:Mods = {
        [cls[size]]: true,
    };
    return (
        <props.icon className={classNames(cls.Icon, mods, [className])} />
    );
});
