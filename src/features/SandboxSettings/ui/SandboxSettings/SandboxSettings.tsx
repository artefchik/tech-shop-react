import { SandboxSettingsKeyWords } from 'features/SandboxSettings/ui/SandboxSettingsKeyWords/SandboxSettingsKeyWords';
import { VStack } from 'shared/ui/Stack';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sandboxSettingsReducer } from 'features/SandboxSettings';
import { SandboxSettingsCategories } from '../../ui/SandboxSettingsCategories/SandboxSettingsCategories';
import { SandboxSettingLanguage } from '../../ui/SandboxSettingLanguage/SandboxSettingLanguage';

interface SandboxSettingsProps {
    className?: string;
}

const reducers: ReducersList = {
    sandboxSettings: sandboxSettingsReducer,
};
export const SandboxSettings = (props: SandboxSettingsProps) => {
    const { className } = props;
    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="20" className={className}>
                <SandboxSettingLanguage />
                <SandboxSettingsCategories />
                {/* <SandboxSettingsKeyWords /> */}
            </VStack>
        </DynamicModuleLoader>
    );
};
