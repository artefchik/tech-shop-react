import { classNames } from 'shared/lib/classNames/classNames';
import { Popover as Pop } from '@headlessui/react';
import React, { CSSProperties, ReactNode } from 'react';
import { VStack } from 'shared/ui/Stack';

import { DropdownsListDirectionOpen, DropdownsListDirectionOpenClasses } from 'shared/ui/DropdownsList/styles/const';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import clsDrop from '../../styles/DropdownsList.module.scss';
import cls from './Popover.module.scss';

export enum TriggerTheme {
  DEFAULT = 'default',
  CLEAR = 'clear'
}
interface PopoverProps {
  className?: string;
  title?: string;
  icon: React.VFC<React.SVGProps<SVGSVGElement>>;
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  openView?:DropdownsListDirectionOpen;
  triggerClear?:boolean
  triggerTheme?:TriggerTheme
}

export const Popover = (props: PopoverProps) => {
    const {
        className,
        title,
        icon,
        children,
        width = 250,
        height = 310,
        openView = 'bottom',
        triggerClear = false,
        triggerTheme = TriggerTheme.DEFAULT,
    } = props;

    const styles: CSSProperties = {
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
    };

    return (
        <Pop className={classNames(clsDrop.DropdownsList, {}, [className])}>
            {({ open }) => (
            /* Use the `open` state to conditionally change the direction of the chevron icon. */
                <>
                    <Pop.Button as="div">
                        <Button
                            theme={ThemeButton.CLEAR}
                            className={classNames(
                                cls.trigger,
                                { [cls.active]: open },
                                [className, cls[triggerTheme]],
                            )}
                        >
                            {title}
                            <Icon Svg={icon} className={cls.icon} />
                        </Button>

                    </Pop.Button>
                    <Pop.Panel
                        className={classNames(
                            clsDrop.body,
                            {},
                            [DropdownsListDirectionOpenClasses[openView]],
                        )}
                        as="div"
                        style={styles}
                    >
                        <VStack gap="15">
                            {children}
                        </VStack>
                    </Pop.Panel>
                </>
            )}
        </Pop>
    );
};
