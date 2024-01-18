import { NavLink, NavLinkProps } from 'react-router-dom';
import { ReactNode } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './AppNavLink.module.scss';

export enum AppNavLinkTheme {
    NAVBAR = 'navbarActive',
    ACTIVE = 'active'
}

interface AppNavLinkProps extends NavLinkProps {
    className?: string;
    isActive?:boolean;
    theme?:AppNavLinkTheme
}

export const AppNavLink = (props: AppNavLinkProps) => {
    const {
        to,
        className,
        children,
        isActive,
        theme = AppNavLinkTheme.NAVBAR,
        ...otherProps
    } = props;

    return (
        <NavLink
            className={({ isActive }) => classNames(cls.AppNavLink, {
                [cls[theme]]: isActive,
            }, [className])}
            to={to}
        >
            {children}
        </NavLink>
    );
};
