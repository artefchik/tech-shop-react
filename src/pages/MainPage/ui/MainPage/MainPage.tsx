import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { VStack } from 'shared/ui/Stack';
import { ProductCategory } from 'entities/Product/model/product';
import { MainPageProductsCards } from '../MainPageProductsCards/MainPageProductsCards';
import cls from './MainPage.module.scss';
import { MainSliderPage } from '../../ui/MainSliderPage/MainSliderPage';

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
                    <MainPageProductsCards category={ProductCategory.PHONE} />
                </VStack>
            </Container>
        </Page>
    );
};
export default MainPage;
