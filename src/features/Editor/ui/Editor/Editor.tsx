import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { VStack } from 'shared/ui/Stack';
import { EditorTitle } from '../EditorTitle/EditorTitle';
import { EditorBlocks } from '../EditorBlocks/EditorBlocks';
import { editorActions, editorReducer } from '../../model/slice/editorSlice';
import { getEditorInitiated } from '../../model/selectors/getEditorInited/getEditorInited';

interface EditorProps {
    className?: string;
}

const reducers: ReducersList = {
    editor: editorReducer,
};

export const Editor = (props: EditorProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const initiated = useSelector(getEditorInitiated);
    useEffect(() => {
        if (!initiated) {
            dispatch(editorActions.initEditor());
        }
    }, [dispatch, initiated]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="5" className={className}>
                <EditorTitle />
                <EditorBlocks />
            </VStack>
        </DynamicModuleLoader>
    );
};
