import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { useCallback } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
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
                            {item.to ? (
                                <AppLink
                                    theme={AppLinkTheme.CLEAR}
                                    to={item.to ?? ''}
                                >
                                    <Text text={item.content} As="span" />
                                </AppLink>
                            ) : (
                                <Text text={item.content} As="span" />
                            )}
                        </li>
                    );
                })}
            </VStack>
        </div>
    );
};
