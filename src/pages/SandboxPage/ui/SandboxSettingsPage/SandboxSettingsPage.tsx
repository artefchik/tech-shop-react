import { Card } from 'shared/ui/Card/Card';
import { VStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { SandboxSettings, sandboxSettingsReducer } from 'features/SandboxSettings';
import { useSelector } from 'react-redux';
import { getSandboxShowSetting } from '../../model/selectors/getSandboxShowSetting/getSandboxShowSetting';
import { SandboxSettingsPreview } from '../SandboxSettingsPreview/SandboxSettingsPreview';

interface SandboxSettingsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    sandboxSettings: sandboxSettingsReducer,
};
export const SandboxSettingsPage = (props: SandboxSettingsPageProps) => {
    const { className } = props;

    const showSettings = useSelector(getSandboxShowSetting);

    return (
        <DynamicModuleLoader reducers={reducers}>
            {showSettings && (
                <VStack gap="20">
                    <Text theme={TextTheme.HEADER} title="Настройки статьи" />
                    <Card>
                        <VStack gap="25">
                            <SandboxSettings />
                            <SandboxSettingsPreview />
                        </VStack>
                    </Card>
                </VStack>
            )}
        </DynamicModuleLoader>
    );
};
