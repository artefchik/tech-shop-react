import { Link, LinkProps } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    ICON = 'icon',
    SECONDARY = 'secondary',
    RED = 'red',
    ACTIVE = 'active',
    CLEAR = 'clear',
    BASE = 'base',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: ReactNode;
}

export const AppLink = (props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            to={to}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
};
