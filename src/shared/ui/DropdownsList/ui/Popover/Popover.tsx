import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Popover as Pop, Transition } from '@headlessui/react';
import React, { CSSProperties, Fragment, ReactNode, useRef } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './Popover.module.scss';

export enum TriggerTheme {
    DEFAULT = 'default',
    CLEAR = 'clear',
}

export enum OpenPopover {
    BOTTOM_LEFT = 'bottomLeft',
    BOTTOM_RIGHT = 'bottomRight',
}

interface PopoverProps {
    className?: string;
    title?: ReactNode;
    icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
    children: ReactNode;
    width?: string | number;
    height?: string | number;
    triggerClear?: boolean;
    triggerTheme?: TriggerTheme;
    fullWidthClass?: string;
    hoverTrigger?: boolean;
    openView?: OpenPopover;
}

export const Popover = (props: PopoverProps) => {
    const {
        className,
        title,
        icon,
        children,
        width,
        height = 310,
        openView = OpenPopover.BOTTOM_LEFT,
        triggerClear = false,
        fullWidthClass = '',
        hoverTrigger = true,
        triggerTheme = TriggerTheme.DEFAULT,
    } = props;

    const bodyItems = useRef<HTMLDivElement>(null);

    const styles: CSSProperties = {
        width,
        minHeight: height,
    };

    return (
        <Pop className={classNames(cls.Popover, {}, [className])}>
            {({ open }) => (
                <>
                    <Pop.Button
                        as="div"
                        className={classNames(
                            cls.trigger,
                            { [cls.active]: open, [cls.hover]: hoverTrigger },
                            [className, cls[triggerTheme]],
                        )}
                    >
                        <span>{title}</span>
                        {icon && <Icon Svg={icon} className={cls.icon} />}
                    </Pop.Button>
                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-500"
                        enterFrom="opacity-0 translate-y-2"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-850"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-2"
                    >
                        <Pop.Panel
                            className={classNames(
                                cls.body,
                                { [cls[openView]]: open },
                                [cls[fullWidthClass]],
                            )}
                            as="div"
                            // style={styles}
                        >
                            <VStack gap="15">{children}</VStack>
                        </Pop.Panel>
                    </Transition>
                </>
            )}
        </Pop>
    );
};
