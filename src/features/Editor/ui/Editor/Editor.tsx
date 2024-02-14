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
import {
    getStorageItem,
    setStorageItem,
} from 'shared/lib/helpers/localStorage';
import { getEditorInited } from 'features/Editor/model/selectors/getEditorInited/getEditorInited';
import { getDate } from 'shared/lib/helpers/date';
import { getEditorShowBlocks } from 'features/Editor/model/selectors/getEditorShowBlocks/getEditorShowBlocks';
import { EditorBlockMain } from '../../ui/EditorBlockMain/EditorBlockMain';
import { getEditorBlocks } from '../../model/selectors/getEditorBlocks/getEditorBlocks';
import { getEditorTitle } from '../../model/selectors/getEditorTitle/getEditorTitle';
import { editorActions, editorReducer } from '../../model/slice/editorSlice';
import cls from './Editor.module.scss';

interface EditorProps {
    className?: string;
}

export const Editor = (props: EditorProps) => {
    const { className } = props;

    const blocks = useSelector(getEditorBlocks);
    const dispatch = useAppDispatch();
    const enterKey = useKeyPress({ key: 'Enter' });
    const title = useSelector(getEditorTitle);
    const inited = useSelector(getEditorInited);
    const showBlocks = useSelector(getEditorShowBlocks);

    useEffect(() => {
        if (!inited) {
            dispatch(editorActions.initEditor());
        }
    }, [dispatch, inited]);

    useEffect(() => {
        if (blocks) {
            setStorageItem(EDITOR_LOCALSTORAGE_KEY, {
                title,
                blocks,
            });
        }
    }, [blocks, title]);

    useEffect(() => {
        if (enterKey) {
            dispatch(
                editorActions.createBlock({
                    id: String(Date.now()),
                    type: ArticleBlockType.TEXT,
                    title: '',
                    paragraphs: [],
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
                    showBlocks &&
                    blocks.map((block) => (
                        <EditorBlockMain key={block.id} item={block} />
                    ))}
            </VStack>
        </DynamicModelLoader>
    );
};
