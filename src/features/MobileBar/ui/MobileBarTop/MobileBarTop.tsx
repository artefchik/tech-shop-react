import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getUserAuthData, User } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { getRoutePathProfile } from 'shared/const/router';
import { useSelector } from 'react-redux';
import { LoginModal } from 'features/AuthByUsername';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { Button } from 'shared/ui/Button/Button';
import cls from './MobileBarTop.module.scss';

interface MobileBarTopProps {
    className?: string;
}

export const MobileBarTop = (props: MobileBarTopProps) => {
    const { className } = props;
    const userData = useSelector(getUserAuthData);
    const { isOpenModal, onCloseModal, onShowModal } = useToggleModal();

    if (!userData) {
        return (
            <div className={classNames(cls.MobileBarTop, {}, [className])}>
                <Button onClick={onShowModal}>Войти</Button>
                {isOpenModal && (
                    <LoginModal isOpen={isOpenModal} onClose={onCloseModal} />
                )}
            </div>
        );
    }

    return (
        <AppLink
            to={getRoutePathProfile(userData?.id ?? '')}
            theme={AppLinkTheme.CLEAR}
            className={classNames(cls.MobileBarTop, {}, [className])}
        >
            <Avatar size={52} src={userData?.avatar} />
            <Text text={userData?.username ?? ''} size={TextSize.BIG} As="span" />
        </AppLink>
    );
};
