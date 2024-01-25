import { classNames } from 'shared/lib/classNames/classNames';
import { Popover as Pop } from '@headlessui/react';
import { IconType } from 'react-icons';
import { ReactNode } from 'react';
import { VStack } from 'shared/ui/Stack';
import cls from './Popover.module.scss';

interface PopoverItem {
  content:ReactNode
}

interface PopoverProps {
    className?: string;
    title?:string;
    Icon?:IconType;
    items?:PopoverItem[];

}

export const Popover = (props: PopoverProps) => {
    const {
        className,
        title,
        Icon,
        items,
    } = props;
    return (
        <Pop className={classNames(cls.Popover, {}, [className])}>
            <Pop.Button as="button" className={cls.trigger}>
                {Icon ? (
                    <span className={cls.bodyText}>
                        {title}
                        <Icon className={cls.icon} />
                    </span>
                ) : title }
            </Pop.Button>
            <Pop.Panel className={cls.body}>
                <VStack gap="15" className={cls.items}>
                    {
                        items?.length && items?.map((item, index) => (
                            <div className={cls.item} key={index}>{item.content}</div>
                        ))
                    }
                </VStack>
            </Pop.Panel>
        </Pop>
    );
};
