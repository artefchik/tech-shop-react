import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/DropdownsList';
import { TriggerTheme } from 'shared/ui/DropdownsList/ui/Popover/Popover';
import icon from 'shared/assets/icons/plus.svg';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { editorCreateButtonConfig } from 'features/Editor/model/types/editorCreateButton';
import { Button, ButtonAlign, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import React, { useCallback, useMemo } from 'react';
import { editorActions } from 'features/Editor/model/slice/editorSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BrowserView, MobileView } from 'react-device-detect';
import { HStack } from 'shared/ui/Stack';
import cls from './EditorCreateButton.module.scss';

interface EditorCreateButtonProps {
    className?: string;
    onChangeBlock: (type: ArticleBlockType) => void;
    id: string;
    row?: boolean;
}

export const EditorCreateButton = (props: EditorCreateButtonProps) => {
    const { className, onChangeBlock, id, row = false } = props;
    const dispatch = useAppDispatch();

    const createHandler = useCallback(
        (type: ArticleBlockType) => {
            switch (type) {
                case ArticleBlockType.IMAGE:
                    return {
                        id,
                        type: ArticleBlockType.IMAGE,
                        image: '',
                        title: '',
                    };

                default:
                    return {
                        id,
                        type: ArticleBlockType.TEXT,
                        title: '',
                        text: '',
                    };
            }
        },
        [id],
    );

    const createBlock = useCallback(
        (type: ArticleBlockType) => () => {
            onChangeBlock(type);
            dispatch(editorActions.createBlock(createHandler(type)));
        },
        [onChangeBlock, createHandler, dispatch],
    );

    const itemsButton = useMemo(
        () =>
            editorCreateButtonConfig.map((item) => (
                <Button
                    theme={ThemeButton.CLEAR}
                    align={ButtonAlign.START}
                    key={item.content}
                    borderRadius
                    onClick={createBlock?.(item.type)}
                    className={classNames(cls.item, {}, [className])}
                >
                    {!!item.icon && <Icon Svg={item.icon} className={cls.icon} />}
                    {item.content}
                </Button>
            )),
        [className, createBlock],
    );

    return (
        <>
            <BrowserView>
                <Popover
                    triggerTheme={TriggerTheme.CLEAR}
                    icon={icon}
                    height={2 * 44}
                    className={classNames(cls.body, {}, [className])}
                >
                    <div className={cls.buttonItems}>{itemsButton}</div>
                </Popover>
            </BrowserView>

            <MobileView>
                <HStack gap="15" align="center" className={cls.bodyMobile}>
                    {itemsButton}
                </HStack>
            </MobileView>
        </>
    );
};
