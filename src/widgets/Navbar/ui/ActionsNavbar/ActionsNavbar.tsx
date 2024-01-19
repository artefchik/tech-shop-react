import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { FaUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { Burger } from 'shared/ui/Burger/Burger';
import cls from './ActionsNavbar.module.scss';

interface ActionsNavbarProps {
    className?: string;
    isOpenMenu?:boolean
    onToggleMenu?:()=>void
}

export const ActionsNavbar = memo((props: ActionsNavbarProps) => {
    const { className, onToggleMenu, isOpenMenu } = props;
    const authData = useSelector(getUserAuthData);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const onShowModal = useCallback(() => {
        setIsOpenModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsOpenModal(false);
    }, []);

    const mods:Mods = useMemo(() => ({
        [cls.active]: isOpenMenu,
    }), [isOpenMenu]);

    return (
        <nav className={classNames(cls.ActionsNavbar, {}, [className])}>
            <ul className={cls.list}>
                {/* { */}
                {/*    ActionItemsList.map((item) => ( */}
                {/*        <li key={item.path} className={cls.item}> */}
                {/*            <ActionsNavbarItem item={item} /> */}
                {/*        </li> */}
                {/*    )) */}
                {/* } */}
                {
                    authData ? (
                        <AppLink
                            to={`${RoutePath.profile}${authData.id}`}
                            className={classNames(cls.ActionsNavbar, {}, [className])}
                        >
                            <FaUser className={cls.icon} />
                        </AppLink>
                    ) : (
                        <>
                            <Button onClick={onShowModal} theme={ThemeButton.CLEAR}>
                                <FaUser className={cls.icon} />
                            </Button>
                            {isOpenModal && <LoginModal isOpen={isOpenModal} onClose={onCloseModal} />}
                        </>
                    )
                }
                <ThemeSwitcher />
                <Burger />
            </ul>
        </nav>
    );
});
