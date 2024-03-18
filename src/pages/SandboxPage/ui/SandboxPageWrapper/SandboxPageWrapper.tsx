import { useCallback } from 'react';
import { SandboxEditorPage } from 'pages/SandboxPage/ui/SandboxEditorPage/SandboxEditorPage';
import { Card } from 'shared/ui/Card/Card';
import { SandboxSettings } from 'features/SandboxSettings';
import { SandboxSettingsPreview } from 'pages/SandboxPage/ui/SandboxSettingsPreview/SandboxSettingsPreview';
import { VStack } from 'shared/ui/Stack';

interface SandboxPageWrapperProps {
    className?: string;
    activeStep: number;
}

export const SandboxPageWrapper = (props: SandboxPageWrapperProps) => {
    const { className, activeStep } = props;
    const renderStepBlock = useCallback(() => {
        if (activeStep === 0) {
            return <SandboxEditorPage />;
        }
        if (activeStep === 1) {
            return (
                <>
                    <SandboxSettings />
                    <SandboxSettingsPreview />
                </>
            );
        }
    }, [activeStep]);

    return (
        <Card fullWidth className={className}>
            <VStack gap="25">{renderStepBlock()}</VStack>
        </Card>
    );
};
