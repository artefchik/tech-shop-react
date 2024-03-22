import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getUserAuthData, User } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { getRoutePathProfile } from 'shared/const/router';
import { useSelector } from 'react-redux';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { Button } from 'shared/ui/Button/Button';
import { AuthModal } from 'widgets/AuthModal/ui/AuthModal';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { mobileBarActions } from 'features/MobileBar/model/slice/mobileBarSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getMobileBarIsOpen } from '../../model/selectors/getMobileBarIsOpen/getMobileBarIsOpen';
import cls from './MobileBarTop.module.scss';

interface MobileBarTopProps {
    className?: string;
}

export const MobileBarTop = (props: MobileBarTopProps) => {
    const { className } = props;
    const userData = useSelector(getUserAuthData);
    const { isOpenModal, onCloseModal, onShowModal } = useToggleModal();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const onCloseBar = useCallback(() => {
        dispatch(mobileBarActions.setOpenBar(false));
    }, [dispatch]);

    if (!userData) {
        return (
            <div className={classNames(cls.MobileBarTop, {}, [className])}>
                <Button onClick={onShowModal}>{t('Login')}</Button>
                {isOpenModal && (
                    <AuthModal isOpen={isOpenModal} onClose={onCloseModal} />
                )}
            </div>
        );
    }

    return (
        <AppLink
            to={getRoutePathProfile(userData?.id ?? '')}
            onClick={onCloseBar}
            theme={AppLinkTheme.CLEAR}
            className={classNames(cls.MobileBarTop, {}, [className])}
        >
            <Avatar size={52} src={userData?.avatar} />
            <Text
                text={userData?.username ?? ''}
                size={TextSize.BIG}
                As="span"
            />
        </AppLink>
    );
};
