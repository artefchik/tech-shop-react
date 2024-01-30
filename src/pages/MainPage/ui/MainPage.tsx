import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { ProductFavoriteButton } from 'features/ProductFavoriteButton';
import { AddToCartButton } from 'features/AddToCartProduct/ui/AddToCartButton';
import { useSelector } from 'react-redux';
import { getCartProducts } from 'entities/Cart/model/selectors/getCartProducts/getCartProducts';
import cls from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const MainPage = (props: MainPageProps) => {
    const { className } = props;

    const item = {
        id: '1',
        title: 'Apple iPhone 11, 64GB, Black - Unlocked (Renewed)',
        image: 'https://freepngimg.com/thumb/apple_iphone/133296-11-apple-iphone-free-transparent-image-hq.png',
        starRating: 4,
        priceSymbol: '$',
        price: {
            current: 275.96,
            previous: 300.2,
        },
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };
    const products = useSelector(getCartProducts);
    console.log(Object.values(products));
    return (
        <Page className={classNames(cls.MainPage, {}, [className])}>
            <Container>
                <AddToCartButton product={item} />
            </Container>
        </Page>
    );
};
export default MainPage;
