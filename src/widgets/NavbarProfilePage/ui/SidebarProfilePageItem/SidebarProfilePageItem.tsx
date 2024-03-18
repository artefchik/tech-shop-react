import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SidebarProfilePageItem.module.scss';

interface SidebarProfilePageItemProps {
    className?: string;
}

export const SidebarProfilePageItem = (props: SidebarProfilePageItemProps) => {
    const { className } = props;
    return (
        <div
            className={classNames(cls.SidebarProfilePageItem, {}, [className])}
        />
    );
};
