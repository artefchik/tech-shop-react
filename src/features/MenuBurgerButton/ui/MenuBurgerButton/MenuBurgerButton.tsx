import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import cls from './MenuBurgerButton.module.scss';
import { menuBurgerActions, menuBurgerReducer } from '../../model/slice/menuBurgerSlice';
import { getIsOpenMenuBurger } from '../../model/selectors/getIsOpenMenuBurger/getIsOpenMenuBurger';

interface MenuBurgerButtonProps {
    className?: string;
}

const reducers: ReducersList = {
    menuBurger: menuBurgerReducer,
};

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
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Button
                onClick={onToggleMenu}
                theme={ThemeButton.CLEAR}
                className={classNames(cls.MenuBurgerButton, mods, [className])}
            >
                <span />
            </Button>
        </DynamicModuleLoader>
    );
};
