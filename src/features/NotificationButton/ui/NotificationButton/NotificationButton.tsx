import { IoIosNotifications } from 'react-icons/io';
import { NotificationList } from 'entities/Notification/ui/NotificationList/NotificationList';
import { Popover } from 'shared/ui/DropdownsList/ui/Popover/Popover';
import { BrowserView, MobileView } from 'react-device-detect';
import { memo, useCallback, useState } from 'react';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);
    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <Button theme={ThemeButton.CLEAR} onClick={onOpenDrawer}><Icon icon={IoIosNotifications} /></Button>
    );

    return (
        <>
            <BrowserView>
                <Popover triggerClear open="bottomLeft" icon={IoIosNotifications}><NotificationList /></Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </>
    );
});
