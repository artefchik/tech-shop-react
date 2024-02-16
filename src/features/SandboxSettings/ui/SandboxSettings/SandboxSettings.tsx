import { SandboxSettingsKeyWords } from 'features/SandboxSettings/ui/SandboxSettingsKeyWords/SandboxSettingsKeyWords';
import { VStack } from 'shared/ui/Stack';
import { SandboxSettingsCategories } from '../../ui/SandboxSettingsCategories/SandboxSettingsCategories';
import { SandboxSettingLanguage } from '../../ui/SandboxSettingLanguage/SandboxSettingLanguage';

interface SandboxSettingsProps {
    className?: string;
}

export const SandboxSettings = (props: SandboxSettingsProps) => {
    const { className } = props;
    return (
        <VStack gap="20" className={className}>
            <SandboxSettingLanguage />
            <SandboxSettingsCategories />
            <SandboxSettingsKeyWords />
        </VStack>
    );
};
