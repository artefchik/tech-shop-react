import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import React, { useCallback } from 'react';
import imageIcon from 'shared/assets/icons/image-icon.svg';
import textIcon from 'shared/assets/icons/text-icon.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './EditorCreateBlockButtonItems.module.scss';
import { editorActions } from '../../model/slice/editorSlice';

export interface EditorCreateButtonItem {
    type: ArticleBlockType;
    content: string;
    onClick: (type: ArticleBlockType) => void;
    icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface EditorCreateBlockButtonItemsProps {
    className?: string;
    changeBlock: (type: ArticleBlockType) => void;
    id: string;
    row?: boolean;
}

export const EditorCreateBlockButtonItems = (
    props: EditorCreateBlockButtonItemsProps,
) => {
    const { className, changeBlock, id, row = false } = props;
    const dispatch = useAppDispatch();

    const create = useCallback(
        (type: ArticleBlockType) => {
            switch (type) {
                case ArticleBlockType.IMAGE:
                    return {
                        id,
                        type: ArticleBlockType.IMAGE,
                        image: '',
                        title: '',
                        paragraphs: [],
                    };

                default:
                    return {
                        id,
                        type: ArticleBlockType.TEXT,
                        image: '',
                        title: '',
                        paragraphs: [],
                    };
            }
        },
        [id],
    );

    const createBlock = (type: ArticleBlockType) => () => {
        changeBlock(type);
        dispatch(editorActions.createBlock(create(type)));
    };

    const items: EditorCreateButtonItem[] = [
        {
            content: 'Текстовый блок',
            onClick: createBlock,
            type: ArticleBlockType.TEXT,
            icon: textIcon,
        },
        {
            content: 'Изображение',
            onClick: createBlock,
            type: ArticleBlockType.IMAGE,
            icon: imageIcon,
        },
    ];

    const mods: Mods = {
        [cls.row]: row,
    };

    return (
        <div
            className={classNames(cls.EditorCreateBlockButtonItems, mods, [
                className,
            ])}
        >
            {items.map((item) => (
                <Button
                    theme={ThemeButton.CLEAR}
                    key={item.content}
                    onClick={createBlock(item.type)}
                    className={classNames(cls.item, {}, [className])}
                >
                    {!!item.icon && (
                        <Icon Svg={item.icon} className={cls.icon} />
                    )}
                    {item.content}
                </Button>
            ))}
        </div>
    );
};
