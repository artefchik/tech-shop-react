import { classNames } from 'shared/lib/classNames/classNames';
import { Popover as Pop, Transition } from '@headlessui/react';
import React, { CSSProperties, Fragment, ReactNode, useRef } from 'react';
import { VStack } from 'shared/ui/Stack';

import {
    DropdownsListDirectionOpen,
    DropdownsListDirectionOpenClasses,
} from 'shared/ui/DropdownsList/styles/const';
import { Icon } from 'shared/ui/Icon/Icon';
import clsDrop from '../../styles/DropdownsList.module.scss';
import cls from './Popover.module.scss';

export enum TriggerTheme {
    DEFAULT = 'default',
    CLEAR = 'clear',
}

interface PopoverProps {
    className?: string;
    title?: ReactNode;
    icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
    children: ReactNode;
    width?: string | number;
    height?: string | number;
    openView?: DropdownsListDirectionOpen;
    triggerClear?: boolean;
    triggerTheme?: TriggerTheme;
    fullWidthClass?: string;
}

export const Popover = (props: PopoverProps) => {
    const {
        className,
        title,
        icon,
        children,
        width,
        height = 310,
        openView = 'bottom',
        triggerClear = false,
        fullWidthClass = '',
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
                        className={classNames(cls.trigger, { [cls.active]: open }, [
                            className,
                            cls[triggerTheme],
                        ])}
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
                            className={classNames(cls.body, { [cls.open]: open }, [
                                // DropdownsListDirectionOpenClasses[openView],
                                cls[fullWidthClass],
                            ])}
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
