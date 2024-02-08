import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { Spoller } from 'shared/ui/Spoller/Spoller';
import cls from './AboutPage.module.scss';

interface AboutPageProps {
    className?: string;
}

const AboutPage = ({ className }: AboutPageProps) => (
    <Page className={classNames(cls.AboutPage, {}, [className])}>
        <Container>About</Container>
    </Page>
);
export default AboutPage;
