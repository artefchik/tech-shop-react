import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuBurgerSchema } from '../types/menuBurger';

const initialState: MenuBurgerSchema = {
    isOpen: false,
};

export const menuBurgerSlice = createSlice({
    name: 'menuBurger',
    initialState,
    reducers: {
        setOpenMenu: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
    },
});

export const { actions: menuBurgerActions } = menuBurgerSlice;
export const { reducer: menuBurgerReducer } = menuBurgerSlice;
