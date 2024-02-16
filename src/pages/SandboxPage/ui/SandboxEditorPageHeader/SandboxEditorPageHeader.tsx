import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getIsEditorBlockInStorage } from 'features/Editor/model/selectors/getEditorBlockInStorage/getEditorBlockInStorage';
import { getEditorInitiated } from 'features/Editor/model/selectors/getEditorInited/getEditorInited';
import { getStorageItem } from 'shared/lib/helpers/localStorage';
import { EDITOR_CREATED_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { DateChange } from 'features/Editor/model/types/editor';
import { Card } from 'shared/ui/Card/Card';
import { HStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { getEditorTitle } from 'features/Editor/model/selectors/getEditorTitle/getEditorTitle';
import { useCallback } from 'react';
import { editorActions } from 'features/Editor/model/slice/editorSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './SandboxEditorPageHeader.module.scss';

interface SandboxEditorPageHeaderProps {
    className?: string;
}

export const SandboxEditorPageHeader = (props: SandboxEditorPageHeaderProps) => {
    const { className } = props;
    const isDataBlocksInStorage = useSelector(getIsEditorBlockInStorage);
    const initiated = useSelector(getEditorInitiated);
    const dateInStorage = getStorageItem(EDITOR_CREATED_LOCALSTORAGE_KEY) as DateChange;
    const conditionDate = dateInStorage.text ? dateInStorage.text : dateInStorage.day;
    const title = useSelector(getEditorTitle);
    const dispatch = useAppDispatch();

    const onReCreateData = useCallback(() => {
        dispatch(editorActions.renderBlocksInStorage());
    }, [dispatch]);

    return (
        <>
            {isDataBlocksInStorage && initiated && (
                <Card
                    className={classNames(cls.SandboxEditorPageHeader, {}, [className])}
                >
                    <HStack align="center" justify="between" gap="20">
                        <Text
                            theme={TextTheme.TEXT}
                            text={`У вас есть резервное сохранение «${title}» от ${conditionDate}  ${dateInStorage.hour}:${dateInStorage.minutes}`}
                        />
                        <Button onClick={onReCreateData}>Восстановить</Button>
                    </HStack>
                </Card>
            )}
        </>
    );
};
