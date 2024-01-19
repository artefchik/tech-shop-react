import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import cls from './Dashboard.module.scss';
import { DashboardList } from '../../model/items';
import { DashboardItem } from '../DashboardItem/DashboardItem';

interface DashboardProps {
    className?: string;
}

export const Dashboard = ({ className }: DashboardProps) => (
    <Card className={classNames(cls.Dashboard, {}, [className])}>
        <Text title="Account Dashboard" size={TextSize.MEDIUM} align={TextAlign.CENTER} className={cls.title} />
        <div className={cls.list}>
            {DashboardList.map((item) => (
                <DashboardItem item={item} key={item.path} />
            ))}
        </div>
    </Card>
);
