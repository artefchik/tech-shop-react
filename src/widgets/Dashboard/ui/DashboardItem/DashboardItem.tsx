import { classNames } from 'shared/lib/classNames/classNames';
import { AppNavLink, AppNavLinkTheme } from 'shared/ui/AppNavLink/AppNavLink';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { DashboardItemType } from '../../model/items';
import cls from './DashboardItem.module.scss';

interface DashboardItemProps {
    className?: string;
    item: DashboardItemType;
}

export const DashboardItem = (props: DashboardItemProps) => {
    const { className, item } = props;
    return (
        <AppNavLink
            to={item.path}
            theme={AppNavLinkTheme.ACTIVE}
            className={classNames(cls.DashboardItem, {}, [className])}
        >
            <Text title={item.text} theme={TextTheme.LINK} />
        </AppNavLink>
    );
};
