import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { useSelector } from 'react-redux';
import { getUserAuthData, UserLink } from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { Editor } from 'features/Editor';
import { Button } from 'shared/ui/Button/Button';
import { getEditorTitle } from 'features/Editor/model/selectors/getEditorTitle/getEditorTitle';
import { getEditorValidate } from 'features/Editor/model/selectors/getEditorValidate/getEditorValidate';
import { getStorageItem, setStorageItem } from 'shared/lib/helpers/localStorage';
import { EDITOR_CREATED_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { DateChange } from 'features/Editor/model/types/editor';
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { editorActions, editorReducer } from 'features/Editor/model/slice/editorSlice';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { getDate } from 'shared/lib/helpers/date';
import { getStorageBlocks } from 'pages/SandboxPage/model/services/getStorageBlock/getStorageBlock';
import { getIsEditorBlockInStorage } from 'features/Editor/model/selectors/getEditorBlockInStorage/getEditorBlockInStorage';
import { getEditorInitiated } from 'features/Editor/model/selectors/getEditorInited/getEditorInited';
import { SandboxEditorPageHeader } from 'pages/SandboxPage/ui/SandboxEditorPageHeader/SandboxEditorPageHeader';
import cls from './SandboxEditorPage.module.scss';

interface SandboxEditorPageProps {
    className?: string;
}

export const SandboxEditorPage = (props: SandboxEditorPageProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const isValidateEditor = useSelector(getEditorValidate);

    return (
        <DynamicModelLoader name="editor" reducer={editorReducer}>
            <VStack gap="20">
                <Text theme={TextTheme.HEADER} title="Создание статьи" />
                <SandboxEditorPageHeader />
                <Card className={classNames(cls.SandboxEditorPage, {}, [className])}>
                    <VStack gap="5">
                        <UserLink user={authData} />
                        <VStack>
                            <Editor />
                        </VStack>
                    </VStack>
                </Card>
                <div>
                    <Button disabled={isValidateEditor}>Перейти к настройкам</Button>
                </div>
            </VStack>
        </DynamicModelLoader>
    );
};
