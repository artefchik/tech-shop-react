import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, ReactNode, useCallback, useEffect } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import {
    AnimationProvider,
    useAnimationLibs,
} from 'shared/lib/components/AnimationProvider';
import { Overlay } from '../Overlay/Overlay';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const height = window.innerHeight;

export const DrawerContent = memo((props: DrawerProps) => {
    const { Spring, Gesture } = useAnimationLibs();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
    const { themeVariant } = useTheme();
    const { className, children, onClose, isOpen, lazy } = props;

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [api, isOpen, openDrawer]);

    const close = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        });
    };

    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -50) cancel();

            if (last) {
                if (my > height * 0.8 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    openDrawer();
                }
            } else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    return (
        <Portal>
            <div
                className={classNames(cls.Drawer, { [cls.opened]: isOpen }, [
                    className,
                    themeVariant,
                    'app_drawer',
                ])}
            >
                <Overlay onClick={close} />
                <Spring.a.div
                    className={cls.sheet}
                    style={{
                        display,
                        bottom: 0,
                        y,
                    }}
                    {...bind()}
                >
                    <div>{children}</div>
                </Spring.a.div>
            </div>
        </Portal>
    );
});

const DrawerAsync = memo((props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
});

export const Drawer = (props: DrawerProps) => (
    <AnimationProvider>
        <DrawerAsync {...props} />
    </AnimationProvider>
);
