import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { HStack, VStack } from 'shared/ui/Stack';
import { AdvantagesItemList } from 'widgets/Advantages';
import cls from 'entities/Product/ui/ProductCard/ProductCard.module.scss';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Card } from 'shared/ui/Card/Card';
import { MainPageArticlesCards } from '../MainPageArticlesCards/MainPageArticlesCards';
import { MainPageProductsCards } from '../MainPageProductsCards/MainPageProductsCards';
import { MainSliderPage } from '../../ui/MainSliderPage/MainSliderPage';

interface MainPageProps {
    className?: string;
}

const MainPage = (props: MainPageProps) => {
    const { className } = props;

    return (
        <Page className={className}>
            <Container>
                <VStack gap="20">
                    <MainSliderPage />
                    <MainPageProductsCards />
                    <MainPageArticlesCards />
                </VStack>
            </Container>
            <AdvantagesItemList />
        </Page>
    );
};
export default MainPage;
