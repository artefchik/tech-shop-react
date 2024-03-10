import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { mobileBarActions } from '../../model/slice/mobileBarSlice';
import { getMobileBarIsOpen } from '../../model/selectors/getMobileBarIsOpen/getMobileBarIsOpen';
import cls from './MobileBarButtonOpen.module.scss';

interface MobileBarButtonOpenProps {
    className?: string;
}

export const MobileBarButtonOpen = (props: MobileBarButtonOpenProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const isOpenBar = useSelector(getMobileBarIsOpen);

    const onToggleBar = useCallback(() => {
        dispatch(mobileBarActions.setOpenBar(!isOpenBar));
    }, [dispatch, isOpenBar]);

    const mods: Mods = {
        [cls.open]: isOpenBar,
    };

    return (
        <Button
            onClick={onToggleBar}
            className={classNames(cls.MobileBarButtonOpen, mods, [className])}
        >
            <span />
        </Button>
    );
};
