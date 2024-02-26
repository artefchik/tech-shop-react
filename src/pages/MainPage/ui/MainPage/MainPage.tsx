import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { MainArticleBlockPage } from 'pages/MainPage/ui/MainArticleBlockPage/MainArticleBlockPage';
import { VStack } from 'shared/ui/Stack';
import { MainSliderPage } from '../../ui/MainSliderPage/MainSliderPage';
import cls from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const MainPage = (props: MainPageProps) => {
    const { className } = props;

    return (
        <Page className={classNames(cls.MainPage, {}, [className])}>
            <Container>
                <VStack gap="20">
                    <MainSliderPage />
                    <MainArticleBlockPage />
                </VStack>
            </Container>
        </Page>
    );
};
export default MainPage;
