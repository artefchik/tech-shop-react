import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { SandboxPageHeader } from 'pages/SandboxPage/ui/SandboxPageHeader/SandboxPageHeader';
import { useState } from 'react';
import { SandboxPageFooter } from 'pages/SandboxPage/ui/SandboxPageFooter/SandboxPageFooter';
import { useTranslation } from 'react-i18next';
import { SandboxPageWrapper } from 'pages/SandboxPage/ui/SandboxPageWrapper/SandboxPageWrapper';
import { VStack } from 'shared/ui/Stack';
import { EditorHeader } from 'features/Editor/ui/EditorHeader/EditorHeader';

const SandboxPage = () => {
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(0);
    const steps = [t('Creating an article'), t('Article Settings')];

    return (
        <Page isBottomPadding>
            <Container>
                <VStack gap="20">
                    <SandboxPageHeader activeStep={activeStep} steps={steps} />
                    <SandboxPageWrapper activeStep={activeStep} />
                    <SandboxPageFooter
                        activeStep={activeStep}
                        onChangeStep={setActiveStep}
                        stepsCount={steps.length}
                    />
                </VStack>
            </Container>
        </Page>
    );
};
export default SandboxPage;
