import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { AppNavLink } from 'shared/ui/AppNavLink/AppNavLink';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getMobileBarIsOpen } from '../../model/selectors/getMobileBarIsOpen/getMobileBarIsOpen';
import { mobileBarActions } from '../../model/slice/mobileBarSlice';
import { MobileNavbarItemType } from '../../model/types/items';
import cls from './MobileContentItem.module.scss';

interface MobileContentItemProps {
    className?: string;
    item: MobileNavbarItemType;
}

export const MobileContentItem = (props: MobileContentItemProps) => {
    const { className, item } = props;

    const dispatch = useAppDispatch();
    const isOpenBar = useSelector(getMobileBarIsOpen);

    const onCloseBar = useCallback(() => {
        dispatch(mobileBarActions.setOpenBar(false));
    }, [dispatch]);

    return (
        <AppNavLink
            className={classNames(cls.MobileContentItem, {}, [className])}
            to={item.path}
            onClick={onCloseBar}
            activeClassname={cls.active}
        >
            <Icon Svg={item.icon} />
            <Text
                text={item.text}
                theme={TextTheme.TEXT}
                As="span"
                size={TextSize.BIG}
            />
        </AppNavLink>
    );
};
