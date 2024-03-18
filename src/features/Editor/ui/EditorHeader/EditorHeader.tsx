import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { Card } from 'shared/ui/Card/Card';
import { HStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { editorActions } from 'features/Editor/model/slice/editorSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { formatToDate } from 'shared/lib/helpers/formatToDate';
import {
    getEditorSavedData,
    isEditorSavedData,
} from '../../model/selectors/getEditorSavedDate/getEditorSavedDate';

interface EditorHeaderProps {
    className?: string;
}

export const EditorHeader = (props: EditorHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const isSavedData = useSelector(isEditorSavedData);

    const { savedDate, title } = useSelector(getEditorSavedData);
    const dispatch = useAppDispatch();

    const savedTitle = title.length > 30 ? `${title.slice(0, 30)}...` : title;

    const onReCreateData = useCallback(() => {
        dispatch(editorActions.renderBlocksStorage());
    }, [dispatch]);

    return (
        <>
            {isSavedData && (
                <Card className={className}>
                    <HStack align="center" justify="between" gap="20">
                        <HStack gap="5">
                            <Text
                                theme={TextTheme.TEXT}
                                text={t('You have the last save')}
                            />
                            <Text
                                theme={TextTheme.TEXT}
                                As="span"
                                text={`«${savedTitle}»`}
                            />
                            <Text theme={TextTheme.TEXT} text={t('from')} />
                            <Text
                                theme={TextTheme.TEXT}
                                As="span"
                                text={formatToDate(new Date(savedDate ?? ''))}
                            />
                        </HStack>
                        <Button onClick={onReCreateData}>{t('Restore')}</Button>
                    </HStack>
                </Card>
            )}
        </>
    );
};
