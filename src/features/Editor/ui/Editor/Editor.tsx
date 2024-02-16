import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useKeyPress } from 'shared/lib/hooks/useKeyPress/useKeyPress';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { VStack } from 'shared/ui/Stack';
import { Input, InputTextSize, InputTheme } from 'shared/ui/Input/Input';
import {
    EDITOR_CREATED_LOCALSTORAGE_KEY,
    EDITOR_LOCALSTORAGE_KEY,
} from 'shared/const/localStorage';
import { getStorageItem, setStorageItem } from 'shared/lib/helpers/localStorage';
import { getEditorBlocks } from 'features/Editor/model/selectors/getEditorBlocks/getEditorBlocks';
import { EditorBlockMain } from '../../ui/EditorBlockMain/EditorBlockMain';
import { getEditorTitle } from '../../model/selectors/getEditorTitle/getEditorTitle';
import { editorActions, editorReducer } from '../../model/slice/editorSlice';
import cls from './Editor.module.scss';
import { getEditorInitiated } from '../../model/selectors/getEditorInited/getEditorInited';

interface EditorProps {
    className?: string;
}

export const Editor = (props: EditorProps) => {
    const { className } = props;

    const blocks = useSelector(getEditorBlocks);
    const dispatch = useAppDispatch();
    const enterKey = useKeyPress({ key: 'Enter' });
    const title = useSelector(getEditorTitle);
    const initiated = useSelector(getEditorInitiated);
    useEffect(() => {
        if (!initiated) {
            dispatch(editorActions.initEditor());
        }
    }, [dispatch, initiated]);

    useEffect(() => {
        if (blocks) {
            setStorageItem(EDITOR_LOCALSTORAGE_KEY, {
                title,
                blocks,
            });
        }
    }, [blocks, initiated, title]);

    useEffect(() => {
        if (enterKey) {
            dispatch(
                editorActions.createBlock({
                    id: String(Date.now()),
                    type: ArticleBlockType.TEXT,
                    title: '',
                    text: '',
                }),
            );
        }
    }, [dispatch, enterKey]);

    const onChangeTitle = useCallback(
        (title: string) => {
            dispatch(editorActions.setTitle(title));
        },
        [dispatch],
    );

    return (
        <DynamicModelLoader name="editor" reducer={editorReducer}>
            <VStack gap="5" className={classNames(cls.Editor, {}, [className])}>
                <Input
                    placeholder="Заголовок"
                    value={title}
                    onChange={onChangeTitle}
                    textSize={InputTextSize.BIG}
                    theme={InputTheme.CLEAR}
                    className={cls.title}
                />
                {!!blocks?.length &&
                    blocks.map((block) => (
                        <EditorBlockMain key={block.id} item={block} />
                    ))}
            </VStack>
        </DynamicModelLoader>
    );
};
