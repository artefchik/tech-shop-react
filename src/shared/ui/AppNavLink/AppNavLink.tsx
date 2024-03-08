import { NavLink, NavLinkProps } from 'react-router-dom';
import { classNames, Mods } from '../../lib/classNames/classNames';
import cls from './AppNavLink.module.scss';

interface AppNavLinkProps extends NavLinkProps {
    className?: string;
    isActive?: boolean;
    activeClassname: string;
}

export const AppNavLink = (props: AppNavLinkProps) => {
    const { to, className, children, isActive, activeClassname, onClick, ...otherProps } =
        props;

    const onClickHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            onClick(event);
        }
    };

    return (
        <NavLink
            onClick={onClickHandler}
            className={({ isActive }) =>
                classNames(
                    cls.AppNavLink,
                    {
                        [activeClassname]: isActive,
                    },
                    [className],
                )
            }
            to={to}
        >
            {children}
        </NavLink>
    );
};
