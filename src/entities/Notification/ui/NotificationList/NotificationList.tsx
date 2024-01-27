import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { useNotifications } from 'entities/Notification/api/notificationApi';
import { NotificationItem } from 'entities/Notification/ui/NotificationItem/NotificationItem';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './NotificationList.module.scss';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = (props: NotificationListProps) => {
    const { className } = props;
    const { data: notifications, isLoading } = useNotifications(null, {
        pollingInterval: 10000,
    });

    if (isLoading) {
        return (
            <VStack gap="15" className={classNames(cls.NotificationList, {}, [className])}>
                <Skeleton width="100%" height={84} />
                <Skeleton width="100%" height={84} />
                <Skeleton width="100%" height={84} />
            </VStack>
        );
    }

    return (
        <VStack gap="15" className={classNames(cls.NotificationList, {}, [className])}>
            {notifications?.map((notification) => <NotificationItem key={notification.id} item={notification} />)}
        </VStack>
    );
};
