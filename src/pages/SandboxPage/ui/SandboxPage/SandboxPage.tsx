import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Card } from 'shared/ui/Card/Card';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import cls from './SandboxPage.module.scss';
import { SandboxEditorPage } from '../../ui/SandboxEditorPage/SandboxEditorPage';

interface SandboxPageProps {
    className?: string;
}

const SandboxPage = (props: SandboxPageProps) => {
    const { className } = props;
    return (
        <Page className={classNames(cls.SandboxPage, {}, [className])}>
            <Container>
                <Text
                    theme={TextTheme.HEADER}
                    title="Создание статьи"
                    className={cls.headerTitle}
                />
                <SandboxEditorPage />
            </Container>
        </Page>
    );
};
export default SandboxPage;
