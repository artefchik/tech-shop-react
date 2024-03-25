import { createSelector } from '@reduxjs/toolkit';
import { getSandboxSettings } from 'features/SandboxSettings/model/selectors/getSandboxSettings/getSandboxSettings';
import { getEditorData } from 'features/Editor';
import {
    Article,
    ArticleBlockType,
    ArticleImageBlock,
    ArticleType,
} from 'entities/Article/model/types/article';
import { getUserAuthData } from 'entities/User';
import { use } from 'i18next';
import { v4 as uuidv4 } from 'uuid';

interface SaveImageType {
    id: string;
    src: File;
}

function getFile(src: string) {
    const base64String = src?.split(',')[1];

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray]);
    const file = new File([blob], uuidv4());

    return file;
}

function getImageBlockFile(block: ArticleImageBlock) {
    if (block.src) {
        const file = getFile(block.src);
        return { id: block._id, src: file } as SaveImageType;
    }
    return null;
}

export const getSandboxArticle = createSelector(
    getSandboxSettings,
    getEditorData,
    getUserAuthData,
    (settings, editorData, user) => {
        if (!settings || !editorData || !user) {
            throw new Error('');
        }
        const formData = new FormData();

        const fileImages: SaveImageType[] = [];

        editorData.blocks.forEach((block) => {
            if (block.type === ArticleBlockType.IMAGE) {
                const file = getImageBlockFile(block);
                if (!file) {
                    throw new Error('');
                }
                fileImages.push(file);
            }
        });
        const prevImage = getFile(settings.previewImage);
        const createdArticle: Article = {
            id: '1',
            title: editorData.title,
            user,
            img: 'f',
            views: 0,
            createdAt: new Date(new Date().toISOString()),
            isUpdate: false,
            types: [settings?.types ?? ArticleType.IT],
            blocks: editorData.blocks,
        };

        for (const createdArticleKey in createdArticle) {
            formData.append(
                createdArticleKey,
                // @ts-ignore
                JSON.stringify(createdArticle[createdArticleKey]),
            );
        }

        fileImages.forEach((image) => {
            formData.append(`image${image.id}`, image.src);
        });
        formData.append(`prevImage`, prevImage);

        return formData;
    },
);
