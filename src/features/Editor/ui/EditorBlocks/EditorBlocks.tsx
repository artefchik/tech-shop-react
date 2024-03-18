import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useKeyPress } from 'shared/lib/hooks/useKeyPress/useKeyPress';
import { EDITOR_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { isBrowser } from 'react-device-detect';
import { setStorageItem } from 'shared/lib/helpers/localStorage';
import { v4 as uuidv4 } from 'uuid';
import { VStack } from 'shared/ui/Stack';
import { getEditorInitiated } from '../../model/selectors/getEditorInited/getEditorInited';
import { EditorSavedData } from '../../model/types/editor';
import { getEditorTitle } from '../../model/selectors/getEditorTitle/getEditorTitle';
import { editorActions } from '../../model/slice/editorSlice';
import { getEditorBlocks } from '../../model/selectors/getEditorBlocks/getEditorBlocks';
import { EditorBlockMain } from '../EditorBlockMain/EditorBlockMain';

interface EditorBlocksProps {
    className?: string;
}

export const EditorBlocks = (props: EditorBlocksProps) => {
    const { className } = props;
    const blocks = useSelector(getEditorBlocks);
    const dispatch = useAppDispatch();
    const title = useSelector(getEditorTitle);
    const enterKey = useKeyPress({ key: 'Shift' });
    const initiated = useSelector(getEditorInitiated);

    useEffect(() => {
        if (enterKey && isBrowser) {
            dispatch(
                editorActions.createBlock({
                    _id: uuidv4(),
                    type: ArticleBlockType.TEXT,
                    title: '',
                    paragraph: '',
                }),
            );
        }
    }, [dispatch, enterKey]);

    useEffect(() => {
        if (initiated) {
            setStorageItem<EditorSavedData>(EDITOR_LOCALSTORAGE_KEY, {
                blocks,
                title,
                savedDate: new Date().toISOString(),
            });
        }
    }, [blocks, initiated, title]);

    return (
        <VStack gap="10" className={className}>
            {!!blocks?.length &&
                blocks.map((block) => (
                    <EditorBlockMain key={block._id} item={block} />
                ))}
        </VStack>
    );
};
