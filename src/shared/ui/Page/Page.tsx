import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { LegacyRef, ReactNode, useEffect } from 'react';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
    triggerRef?: LegacyRef<HTMLDivElement>;
    isLock?: boolean;
    isBottomPadding?: boolean;
}

export const Page = (props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd,
        triggerRef,
        isLock,
        isBottomPadding = false,
    } = props;

    useEffect(() => {
        if (onScrollEnd) {
            onScrollEnd();
        }
    }, [onScrollEnd]);

    const mods: Mods = {
        [cls.open]: isLock,
        [cls.bottom]: isBottomPadding,
    };

    return (
        <main className={classNames(cls.Page, mods, [className])}>
            {children}
            {triggerRef && <div ref={triggerRef} className={cls.trigger} />}
        </main>
    );
};
