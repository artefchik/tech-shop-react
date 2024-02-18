import { classNames } from 'shared/lib/classNames/classNames';
import { InputHTMLAttributes, ReactNode, useCallback } from 'react';
import cls from './Tabs.module.scss';

export interface TabItem {
    value: string;
    content: ReactNode;
}

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    name: string;
}

export const Tabs = (props: TabsProps) => {
    const { className, onTabClick, value, tabs, name } = props;
    const onChangeHandler = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.length &&
                tabs.map((tab) => {
                    const active = tab.value === value;
                    return (
                        <div
                            key={tab.value}
                            className={classNames(
                                cls.tab,
                                { [cls.active]: active },
                                [className],
                            )}
                        >
                            <input
                                type="radio"
                                id={tab.value}
                                value={tab.value}
                                name={name}
                                onChange={onChangeHandler(tab)}
                                className={cls.radio}
                            />
                            <label htmlFor={tab.value}>
                                <span>{tab.content}</span>
                            </label>
                        </div>
                    );
                })}
        </div>
    );
};
