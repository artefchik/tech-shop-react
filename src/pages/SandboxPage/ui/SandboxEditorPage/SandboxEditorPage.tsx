import { Card } from 'shared/ui/Card/Card';
import { useSelector } from 'react-redux';
import { getUserAuthData, UserLink } from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { Editor } from 'features/Editor';
import { Button } from 'shared/ui/Button/Button';
import { getEditorValidate } from 'features/Editor/model/selectors/getEditorValidate/getEditorValidate';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { SandboxEditorPageHeader } from 'pages/SandboxPage/ui/SandboxEditorPageHeader/SandboxEditorPageHeader';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    sandboxPageActions,
    sandboxPageReducer,
} from 'pages/SandboxPage/model/slice/sandboxPageSlice/sandboxPageSlice';
import { getSandboxShowSetting } from 'pages/SandboxPage/model/selectors/getSandboxShowSetting/getSandboxShowSetting';
import { Popover } from 'shared/ui/DropdownsList';

import tips from 'shared/assets/icons/tip-close.svg';
import { TriggerTheme } from 'shared/ui/DropdownsList/ui/Popover/Popover';
import cls from './SandboxEditorPage.module.scss';

interface SandboxEditorPageProps {
    className?: string;
}

const reducers: ReducersList = {
    sandboxPage: sandboxPageReducer,
};

export const SandboxEditorPage = (props: SandboxEditorPageProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const isValidateEditor = useSelector(getEditorValidate);
    const dispatch = useAppDispatch();
    const showSettings = useSelector(getSandboxShowSetting);

    const onShowSettings = useCallback(() => {
        dispatch(sandboxPageActions.setShowSettings());
    }, [dispatch]);
    return (
        <DynamicModuleLoader reducers={reducers}>
            {!showSettings && (
                <VStack gap="20" className={className}>
                    <Text theme={TextTheme.HEADER} title="Создание статьи" />
                    <SandboxEditorPageHeader />
                    <Card fullWidth>
                        <VStack gap="10" className={cls.editorBody}>
                            <HStack justify="between">
                                <UserLink user={authData} />
                                <Popover
                                    openView="bottomLeft"
                                    triggerTheme={TriggerTheme.CLEAR}
                                    icon={tips}
                                    height={70}
                                    width={320}
                                >
                                    <Text
                                        theme={TextTheme.SMALL}
                                        title={
                                            'Для создания базового текстового блока нажмите "~" '
                                        }
                                    />
                                </Popover>
                            </HStack>
                            <Editor />
                        </VStack>
                    </Card>
                    <div>
                        <Button onClick={onShowSettings} disabled={isValidateEditor}>
                            Перейти к настройкам
                        </Button>
                    </div>
                </VStack>
            )}
        </DynamicModuleLoader>
    );
};
