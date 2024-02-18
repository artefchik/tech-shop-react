import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getEditorInitiated } from 'features/Editor/model/selectors/getEditorInited/getEditorInited';
import { Card } from 'shared/ui/Card/Card';
import { HStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { getEditorTitle } from 'features/Editor/model/selectors/getEditorTitle/getEditorTitle';
import { useCallback } from 'react';
import { editorActions } from 'features/Editor/model/slice/editorSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getEditorSavedData,
    isEditorSavedDate,
} from 'features/Editor/model/selectors/getEditorSavedDate/getEditorSavedDate';
import { getDate } from 'shared/lib/helpers/date';
import cls from './SandboxEditorPageHeader.module.scss';

interface SandboxEditorPageHeaderProps {
    className?: string;
}

export const SandboxEditorPageHeader = (props: SandboxEditorPageHeaderProps) => {
    const { className } = props;
    const initiated = useSelector(getEditorInitiated);

    const isSavedData = useSelector(isEditorSavedDate);

    const { savedDate, title: savedTitle } = useSelector(getEditorSavedData);
    const dispatch = useAppDispatch();

    const onReCreateData = useCallback(() => {
        dispatch(editorActions.renderBlocksStorage());
    }, [dispatch]);

    const date = getDate(savedDate);

    const dateNotice = `${date?.day} ${date?.month} ${date?.hour}:${date?.minutes}`;

    return (
        <>
            {isSavedData && (
                <Card
                    className={classNames(cls.SandboxEditorPageHeader, {}, [className])}
                >
                    <HStack align="center" justify="between" gap="20">
                        <Text
                            theme={TextTheme.TEXT}
                            text={`У вас есть резервное сохранение «${savedTitle}» от ${dateNotice}`}
                        />
                        <Button onClick={onReCreateData}>Восстановить</Button>
                    </HStack>
                </Card>
            )}
        </>
    );
};
