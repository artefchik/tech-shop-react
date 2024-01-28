import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './ActionsNavbarItem.module.scss';
import { ActionNavbarItemType } from '../../model/items';

interface ActionsNavbarItemProps {
  className?: string;
  item:ActionNavbarItemType
}

export const ActionsNavbarItem = (props: ActionsNavbarItemProps) => {
    const { className, item } = props;
    return (
        <AppLink to={item.path} className={classNames(cls.ActionsNavbar, {}, [className])} />
    );
};
