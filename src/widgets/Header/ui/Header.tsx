import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Container } from 'shared/ui/Container/Container';
import { Navbar } from 'widgets/Navbar';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import Logo from 'shared/assets/icons/logo.svg';
import { ActionsNavbar } from 'widgets/Navbar/ui/ActionsNavbar/ActionsNavbar';
import cls from './Header.module.scss';

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.Header, {}, [className])}>
            <Container className={cls.container}>
                <AppLink to={RoutePath.main} className={cls.logo}>
                    <Logo />
                </AppLink>
                <Navbar className={cls.navbar} />
                <ActionsNavbar className={cls.actions} />
            </Container>
        </div>
    );
};
