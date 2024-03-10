import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { MobileBarBottom } from 'features/MobileBar/ui/MobileBarBottom/MobileBarBottom';
import { MobileBarButtonOpen } from 'features/MobileBar/ui/MobileBarButtonOpen/MobileBarButtonOpen';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { Overlay } from 'shared/ui/Overlay/Overlay';
import { mobileBarActions, mobileBarReducer } from '../../model/slice/mobileBarSlice';
import { classNames, Mods } from '../../../../shared/lib/classNames/classNames';
import { MobileBarContent } from '../MobileBarContent/MobileBarContent';
import { MobileBarTop } from '../MobileBarTop/MobileBarTop';
import cls from './MobileBar.module.scss';
import { getMobileBarIsOpen } from '../../model/selectors/getMobileBarIsOpen/getMobileBarIsOpen';

interface MobileBarProps {
    className?: string;
}

const reducers: ReducersList = {
    mobileBar: mobileBarReducer,
};

export const MobileBar = (props: MobileBarProps) => {
    const { className } = props;
    const isOpenBar = useSelector(getMobileBarIsOpen);
    const dispatch = useAppDispatch();
    const mods: Mods = {
        [cls.open]: isOpenBar,
    };

    const onCloseBar = useCallback(() => {
        dispatch(mobileBarActions.setOpenBar(false));
    }, [dispatch]);

    return (
        <>
            {isMobile && (
                <DynamicModuleLoader reducers={reducers}>
                    <MobileBarButtonOpen />
                    <VStack className={classNames(cls.MobileBar, mods, [className])}>
                        {isOpenBar && <Overlay onClick={onCloseBar} />}

                        <>
                            <MobileBarTop />
                            <MobileBarContent />
                            <MobileBarBottom />
                        </>
                    </VStack>
                </DynamicModuleLoader>
            )}
        </>
    );
};
