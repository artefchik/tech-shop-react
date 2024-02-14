import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getRoutePathProfile } from 'shared/const/router';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { Editor } from 'features/Editor';
import { Button } from 'shared/ui/Button/Button';
import { getEditorTitle } from 'features/Editor/model/selectors/getEditorTitle/getEditorTitle';
import { getEditorValidate } from 'features/Editor/model/selectors/getEditorValidate/getEditorValidate';
import {
    getStorageItem,
    setStorageItem,
} from 'shared/lib/helpers/localStorage';
import { EDITOR_CREATED_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { DateChange } from 'features/Editor/model/types/editor';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    editorActions,
    editorReducer,
} from 'features/Editor/model/slice/editorSlice';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { getEditorShowBlocks } from 'features/Editor/model/selectors/getEditorShowBlocks/getEditorShowBlocks';
import { getDate } from 'shared/lib/helpers/date';
import cls from './SandboxEditorPage.module.scss';

interface SandboxEditorPageProps {
    className?: string;
}

export const SandboxEditorPage = (props: SandboxEditorPageProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const dateInStorage = getStorageItem(
        EDITOR_CREATED_LOCALSTORAGE_KEY,
    ) as DateChange;
    const isValidateEditor = useSelector(getEditorValidate);
    const title = useSelector(getEditorTitle);
    const dispatch = useAppDispatch();
    const showBlocks = useSelector(getEditorShowBlocks);

    const conditionDate = dateInStorage.text
        ? dateInStorage.text
        : dateInStorage.day;

    const onReCreateData = useCallback(() => {
        dispatch(editorActions.showBlocks());
    }, [dispatch]);

    useEffect(
        () => () => {
            const todayDate = new Date();
            const date = getDate(todayDate);
            setStorageItem(EDITOR_CREATED_LOCALSTORAGE_KEY, date);
        },
        [dispatch],
    );

    return (
        <DynamicModelLoader name="editor" reducer={editorReducer}>
            <VStack gap="20">
                <Text theme={TextTheme.HEADER} title="Создание статьи" />
                {dateInStorage && !showBlocks && (
                    <Card>
                        <HStack align="center" justify="between" gap="20">
                            <Text
                                theme={TextTheme.TEXT}
                                text={`У вас есть резервное сохранение «${title}» от ${conditionDate}  ${dateInStorage.hour}:${dateInStorage.minutes}`}
                            />
                            <Button onClick={onReCreateData}>
                                Восстановить
                            </Button>
                        </HStack>
                    </Card>
                )}

                <Card
                    className={classNames(cls.SandboxEditorPage, {}, [
                        className,
                    ])}
                >
                    <AppLink
                        to={getRoutePathProfile(authData?.id || '')}
                        theme={AppLinkTheme.CLEAR}
                        className={cls.info}
                    >
                        <Avatar
                            src={authData?.avatar}
                            alt={authData?.username}
                        />
                        <Text
                            text={authData?.username}
                            theme={TextTheme.USER}
                        />
                    </AppLink>
                    <VStack>
                        <Editor />
                    </VStack>
                </Card>
                <div>
                    <Button disabled={isValidateEditor}>
                        Перейти к настройкам
                    </Button>
                </div>
            </VStack>
        </DynamicModelLoader>
    );
};
