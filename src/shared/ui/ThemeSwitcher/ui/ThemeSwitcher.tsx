import React from 'react';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import moon from 'shared/assets/icons/moon.svg';
import sun from 'shared/assets/icons/sun.svg';
import { Icon } from 'shared/ui/Icon/Icon';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { themeVariant, toggleTheme } = useTheme();

    return (
        <Button theme={ThemeButton.CLEAR} onClick={toggleTheme}>
            {themeVariant === Theme.DARK ? <Icon Svg={moon} /> : <Icon Svg={sun} />}
        </Button>
    );
};
