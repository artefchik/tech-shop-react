import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getRoutePathProfile } from 'shared/const/router';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { User } from '../../model/types/user';
import cls from './UserLink.module.scss';

interface UserLinkProps {
    className?: string;
    user?: User;
}

export const UserLink = (props: UserLinkProps) => {
    const { className, user } = props;
    return (
        <AppLink
            to={getRoutePathProfile(user?.id || '')}
            theme={AppLinkTheme.CLEAR}
            className={classNames(cls.UserLink, {}, [className])}
        >
            <Avatar src={user?.avatar} alt={user?.username} />
            <Text text={user?.username} theme={TextTheme.USER} />
        </AppLink>
    );
};
