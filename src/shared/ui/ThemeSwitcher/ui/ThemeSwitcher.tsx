import React from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { classNames, Mods } from '../../../lib/classNames/classNames';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <label className={classNames(cls.switch, {}, [className])}>
            <input onChange={toggleTheme} type="checkbox" />
            <span className={cls.slider} />
        </label>
    );
};
