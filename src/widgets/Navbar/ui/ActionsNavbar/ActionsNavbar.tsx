import { classNames } from 'shared/lib/classNames/classNames';
import { memo, Suspense } from 'react';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { NotificationButton } from 'features/NotificationButton';
import { AvatarDropdown } from 'features/AvatarDropdown/ui/AvatarDropdown';
import { CartButton } from 'features/CartButton';
import { HStack } from 'shared/ui/Stack';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import cls from './ActionsNavbar.module.scss';

interface ActionsNavbarProps {
    className?: string;
}

export const ActionsNavbar = memo((props: ActionsNavbarProps) => {
    const { className } = props;
    return (
        <nav className={classNames(cls.ActionsNavbar, {}, [className])}>
            <HStack gap="20" align="center">
                <Suspense fallback="">
                    <LangSwitcher open="bottomLeft" />
                </Suspense>
                <NotificationButton />
                <CartButton />
                <AvatarDropdown />
                <ThemeSwitcher />
            </HStack>
        </nav>
    );
});
