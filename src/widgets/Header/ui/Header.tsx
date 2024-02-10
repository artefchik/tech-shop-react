import { classNames } from 'shared/lib/classNames/classNames';
import { Container } from 'shared/ui/Container/Container';
import { Navbar } from 'widgets/Navbar';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import Logo from 'shared/assets/icons/logo.svg';
import { ActionsNavbar } from 'widgets/Navbar/ui/ActionsNavbar/ActionsNavbar';
import { getRoutePathMain, RoutePath } from 'shared/const/router';
import cls from './Header.module.scss';

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className } = props;

    return (
        <header className={classNames(cls.Header, {}, [className])}>
            <Container className={cls.container}>
                <AppLink
                    to={getRoutePathMain()}
                    className={cls.logo}
                    theme={AppLinkTheme.CLEAR}
                >
                    <Logo />
                </AppLink>
                <Navbar className={cls.navbar} />
                <ActionsNavbar className={cls.actions} />
            </Container>
        </header>
    );
};
