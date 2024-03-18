import { useSelector } from 'react-redux';
import { getUserAuthData, UserLink } from 'entities/User';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { Editor } from 'features/Editor';
import { Popover } from 'shared/ui/DropdownsList';
import tips from 'shared/assets/icons/tip-close.svg';
import {
    OpenPopover,
    TriggerTheme,
} from 'shared/ui/DropdownsList/ui/Popover/Popover';
import { isBrowser } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { EditorHeader } from 'features/Editor/ui/EditorHeader/EditorHeader';
import cls from './SandboxEditorPage.module.scss';

interface SandboxEditorPageProps {
    className?: string;
}

export const SandboxEditorPage = (props: SandboxEditorPageProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);
    const { t } = useTranslation();
    return (
        <>
            <EditorHeader />
            <VStack gap="10" className={cls.editorBody}>
                <HStack justify="between">
                    <UserLink user={authData} />
                    {isBrowser && (
                        <Popover
                            openView={OpenPopover.BOTTOM_LEFT}
                            triggerTheme={TriggerTheme.CLEAR}
                            icon={tips}
                            height={65}
                            width={320}
                            hoverTrigger={false}
                        >
                            <Text
                                size={TextSize.SMALL}
                                text={t('To create a basic text block')}
                            />
                        </Popover>
                    )}
                </HStack>
                <Editor />
            </VStack>
        </>
    );
};
