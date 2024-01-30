import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import arrowRight from 'shared/assets/icons/arrowRight.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { NotificationType } from '../../model/types/notifcation';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: NotificationType;
}

export const NotificationItem = (props: NotificationItemProps) => {
    const { className, item } = props;
    return (
        <Card className={classNames(cls.NotificationItem, {}, [className])}>
            <Text
                theme={TextTheme.SMALL}
                title={item.title}
                text={item.description}
            />
            {item.href && (
                <AppLink
                    to={item.href}
                    theme={AppLinkTheme.CLEAR}
                    className={cls.link}
                >
                    <Icon Svg={arrowRight} />
                </AppLink>
            )}
        </Card>
    );
};
