import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { SandboxSettingsPage } from '../SandboxSettingsPage/SandboxSettingsPage';
import { SandboxEditorPage } from '../../ui/SandboxEditorPage/SandboxEditorPage';

const SandboxPage = () => (
    <Page>
        <Container>
            <SandboxEditorPage />
            <SandboxSettingsPage />
        </Container>
    </Page>
);
export default SandboxPage;
