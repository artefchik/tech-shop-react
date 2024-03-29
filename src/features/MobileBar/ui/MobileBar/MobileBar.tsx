import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { DrawerContent } from 'shared/ui/Drawer/Drawer';
import { VStack } from 'shared/ui/Stack';
import { MobileBarButtonOpen } from '../MobileBarButtonOpen/MobileBarButtonOpen';
import { MobileBarBottom } from '../MobileBarBottom/MobileBarBottom';
import {
    mobileBarActions,
    mobileBarReducer,
} from '../../model/slice/mobileBarSlice';
import { Mods } from '../../../../shared/lib/classNames/classNames';
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

    useEffect(() => {
        if (isOpenBar) {
            document.body.classList.add('lock');
        }
        return () => {
            document.body.classList.remove('lock');
        };
    }, [isOpenBar]);

    const onCloseBar = useCallback(() => {
        dispatch(mobileBarActions.setOpenBar(false));
    }, [dispatch]);

    return (
        <>
            {isMobile && (
                <DynamicModuleLoader reducers={reducers}>
                    <MobileBarButtonOpen />
                    <DrawerContent isOpen={isOpenBar} onClose={onCloseBar}>
                        <VStack>
                            <MobileBarTop />
                            <MobileBarContent />
                            <MobileBarBottom />
                        </VStack>
                    </DrawerContent>
                </DynamicModuleLoader>
            )}
        </>
    );
};
