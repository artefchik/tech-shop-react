import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode, useCallback } from 'react';
import cls from './Tabs.module.scss';

export interface TabItem {
    value:string;
    content:ReactNode
}

interface TabsProps {
    className?: string;
    tabs:TabItem[];
    value:string;
    onTabClick:(tab:TabItem) => void
}

export const Tabs = (props: TabsProps) => {
    const {
        className, onTabClick, value, tabs,
    } = props;
    const onclickHandler = useCallback((tab: TabItem) => () => {
        onTabClick(tab);
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.length && tabs.map((tab) => {
                const active = tab.value === value;
                return (
                    <div
                        key={tab.value}
                        className={classNames(cls.tab, { [cls.active]: active }, [className])}
                        onClick={onclickHandler(tab)}
                    >
                        {tab.content}
                    </div>

                );
            })}
        </div>
    );
};
