import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import cls from './NavbarProfilePage.module.scss';
import {
    profileItemsConfig,
    ProfilePageItemType,
} from '../../model/types/profileItem';

interface NavbarProfilePageProps {
    className?: string;
    block: ProfilePageItemType;
    onChangeBlock: (block: ProfilePageItemType) => void;
}

export const NavbarProfilePage = (props: NavbarProfilePageProps) => {
    const { className, onChangeBlock, block } = props;

    const onChangeHandler = useCallback(
        (block: ProfilePageItemType) => () => {
            console.log(block);
            onChangeBlock(block);
        },
        [onChangeBlock],
    );

    return (
        <div className={classNames(cls.NavbarProfilePage, {}, [className])}>
            <VStack As="ul" className={cls.body}>
                {profileItemsConfig.map((item) => {
                    const active = item.block === block;
                    return (
                        <li
                            onClick={onChangeHandler(item.block)}
                            key={item.block}
                            className={classNames(
                                cls.block,
                                { [cls.active]: active },
                                [],
                            )}
                        >
                            <Text text={item.content} As="span" />
                        </li>
                    );
                })}
            </VStack>
        </div>
    );
};
