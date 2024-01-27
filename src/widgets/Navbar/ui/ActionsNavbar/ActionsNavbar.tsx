import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { FaUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { Burger } from 'shared/ui/Burger/Burger';
import { Dropdown, DropdownItem } from 'shared/ui/DropdownsList/ui/Dropdown/Dropdown';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { NotificationButton } from 'features/NotificationButton';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import cls from './ActionsNavbar.module.scss';

interface ActionsNavbarProps {
    className?: string;
    isOpenMenu?:boolean
    onToggleMenu?:()=>void
}

export const ActionsNavbar = memo((props: ActionsNavbarProps) => {
    const { className, onToggleMenu, isOpenMenu } = props;
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    // const [isOpenModal, setIsOpenModal] = useState(false);
    //
    // const onShowModal = useCallback(() => {
    //     setIsOpenModal(true);
    // }, []);
    //
    // const onCloseModal = useCallback(() => {
    //     setIsOpenModal(false);
    // }, []);

    const { isOpenModal, onCloseModal, onShowModal } = useToggleModal();

    const onLogout = useCallback(() => {
        dispatch(userActions.setLogout());
    }, [dispatch]);

    const mods:Mods = useMemo(() => ({
        [cls.active]: isOpenMenu,
    }), [isOpenMenu]);

    const profileActions:DropdownItem[] = [
        ...(authData ? [{
            content: 'Профиль',
            href: RoutePath.profile + authData.id,
        }, {
            content: 'Выйти',
            onClick: onLogout,
        },
        ] : [{ content: 'Войти', onClick: onShowModal }]),
    ];

    return (
        <nav className={classNames(cls.ActionsNavbar, {}, [className])}>
            <ul className={cls.list}>
                <NotificationButton />
                <Dropdown items={profileActions} Icon={FaUser} open="bottomLeft" triggerClear />
                {isOpenModal && <LoginModal isOpen={isOpenModal} onClose={onCloseModal} />}
                <ThemeSwitcher />
                <Burger />
            </ul>
        </nav>
    );
});
