import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './MenuBurgerButton.module.scss';
import {
    menuBurgerActions,
    menuBurgerReducer,
} from '../../model/slice/menuBurgerSlice';
import { getIsOpenMenuBurger } from '../../model/selectors/getIsOpenMenuBurger/getIsOpenMenuBurger';

interface MenuBurgerButtonProps {
    className?: string;
}

export const MenuBurgerButton = (props: MenuBurgerButtonProps) => {
    const { className } = props;
    const isOpenMenuBurger = useSelector(getIsOpenMenuBurger);
    const dispatch = useAppDispatch();
    const onToggleMenu = useCallback(() => {
        dispatch(menuBurgerActions.setOpenMenu(!isOpenMenuBurger));
    }, [dispatch, isOpenMenuBurger]);

    const mods: Mods = {
        [cls.open]: isOpenMenuBurger,
    };

    return (
        <DynamicModelLoader name="menuBurger" reducer={menuBurgerReducer}>
            <Button
                onClick={onToggleMenu}
                theme={ThemeButton.CLEAR}
                className={classNames(cls.MenuBurgerButton, mods, [className])}
            >
                <span />
            </Button>
        </DynamicModelLoader>
    );
};
