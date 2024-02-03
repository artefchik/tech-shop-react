import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { AddToCartButton } from 'features/AddToCartProduct/ui/AddToCartButton';
import { Counter } from 'shared/ui/Counter/Counter';
import { useState } from 'react';
import { CartItem } from 'entities/Cart/ui/CartItem/CartItem';
import { useSelector } from 'react-redux';
import { getCart } from 'entities/Cart/model/slice/cartSlice';
import cls from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const MainPage = (props: MainPageProps) => {
    const { className } = props;

    const [value, setValue] = useState(1);

    const onIncrement = (value: number) => {
        setValue(value + 1);
    };
    const onDecrement = (value: number) => {
        setValue(value - 1);
    };

    const item = {
        id: '1',
        title: 'Apple iPhone 11, 64GB, Black - Unlocked (Renewed)',
        image: 'https://freepngimg.com/thumb/apple_iphone/133296-11-apple-iphone-free-transparent-image-hq.png',
        starRating: 4,
        priceSymbol: '$',
        quantity: 1,
        price: {
            current: 275.96,
            previous: 300.2,
        },
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };
    return (
        <Page className={classNames(cls.MainPage, {}, [className])}>
            <Container>
                {/* <AddToCartButton product={item} /> */}
                {/* <CartItem item={item} /> */}
            </Container>
        </Page>
    );
};
export default MainPage;
