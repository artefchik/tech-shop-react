import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import cls from './MobileBarContent.module.scss';
import { mobileNavbarItemsList } from '../../model/types/items';
import { MobileContentItem } from '../MobileBarContent/MobileContentItem';

interface MobileBarContentProps {
    className?: string;
}

export const MobileBarContent = (props: MobileBarContentProps) => {
    const { className } = props;
    return (
        <VStack
            width
            As="nav"
            className={classNames(cls.MobileBarContent, {}, [className])}
        >
            <VStack As="ul" className={cls.content}>
                {mobileNavbarItemsList.map((item) => (
                    <li key={item.path}>
                        <MobileContentItem item={item} />
                    </li>
                ))}
            </VStack>
        </VStack>
    );
};
