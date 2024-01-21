import { classNames } from 'shared/lib/classNames/classNames';
import {
    LegacyRef,
    memo,
    ReactNode,
    useEffect,
} from 'react';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children:ReactNode
  onScrollEnd?:()=>void;
  triggerRef?:LegacyRef<HTMLDivElement>
}

export const Page = memo((props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd,
        triggerRef,
    } = props;

    useEffect(() => {
        if (onScrollEnd) {
            onScrollEnd();
        }
    }, [onScrollEnd]);
    return (
        <section className={classNames(cls.Page, {}, [className])}>
            {children}
            <div ref={triggerRef} className={cls.trigger} />
        </section>
    );
});
