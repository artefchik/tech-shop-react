import { classNames } from 'shared/lib/classNames/classNames';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import React, { Suspense } from 'react';
import { HStack } from 'shared/ui/Stack';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { MobileBarButtonOpen } from 'features/MobileBar/ui/MobileBarButtonOpen/MobileBarButtonOpen';
import cls from './MobileBarBottom.module.scss';

interface MobileBarBottomProps {
    className?: string;
}

export const MobileBarBottom = (props: MobileBarBottomProps) => {
    const { className } = props;
    return (
        <HStack
            width
            justify="end"
            className={classNames(cls.MobileBarBottom, {}, [className])}
        >
            <HStack gap="30" align="center" className={cls.content}>
                <Suspense fallback="">
                    <LangSwitcher />
                </Suspense>
                <ThemeSwitcher />
            </HStack>
        </HStack>
    );
};
