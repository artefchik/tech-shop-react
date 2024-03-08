import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { LegacyRef, memo, ReactNode, useEffect, useMemo } from 'react';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
    triggerRef?: LegacyRef<HTMLDivElement>;
    isLock?: boolean;
}

export const Page = (props: PageProps) => {
    const { className, children, onScrollEnd, triggerRef, isLock } = props;

    useEffect(() => {
        if (onScrollEnd) {
            onScrollEnd();
        }
    }, [onScrollEnd]);

    const mods: Mods = {
        [cls.open]: isLock,
    };

    return (
        <main className={classNames(cls.Page, mods, [className])}>
            {children}
            {triggerRef && <div ref={triggerRef} className={cls.trigger} />}
        </main>
    );
};
