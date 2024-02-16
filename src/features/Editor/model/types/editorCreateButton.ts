import { ArticleBlockType } from 'entities/Article/model/types/article';
import React from 'react';
import textIcon from 'shared/assets/icons/text-icon.svg';
import imageIcon from 'shared/assets/icons/image-icon.svg';

export interface EditorCreateButtonItem {
    type: ArticleBlockType;
    content: string;
    icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
}
export const editorCreateButtonConfig: EditorCreateButtonItem[] = [
    {
        content: 'Текстовый блок',
        type: ArticleBlockType.TEXT,
        icon: textIcon,
    },
    {
        content: 'Изображение',
        type: ArticleBlockType.IMAGE,
        icon: imageIcon,
    },
];
