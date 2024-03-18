import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { useSelector } from 'react-redux';
import { Header } from 'widgets/Header';
import {
    getUserAuthData,
    getUserInitiated,
    initUserAuthData,
} from 'entities/User';
import { Footer } from 'widgets/Footer';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isBrowser } from 'react-device-detect';
import { MobileBar } from 'features/MobileBar';
import { fetchCartProductsList } from 'features/CartProduct';
import { getCartId, initCartData } from 'entities/Cart';
import { getFavoriteDataId, initFavoriteData } from 'entities/Favorite';
import { fetchProductsFavorites } from 'features/ProductFavoriteButton';
import { NotificationButton } from 'features/NotificationButton';
import { ErrorButton } from 'app/providers/ErrorBoundary/ui/ErrorButton';

function App() {
    const { themeVariant } = useTheme();
    const dispatch = useAppDispatch();
    const initiated = useSelector(getUserInitiated);
    const userData = useSelector(getUserAuthData);

    const favorite = useSelector(getFavoriteDataId);
    const cart = useSelector(getCartId);

    useEffect(() => {
        dispatch(initUserAuthData());
    }, [dispatch]);

    useEffect(() => {
        if (userData) {
            dispatch(initFavoriteData(userData.id));
            dispatch(initCartData(userData.id));
        }
    }, [dispatch, userData]);

    useEffect(() => {
        if (favorite) {
            dispatch(fetchProductsFavorites());
        }
        if (cart) {
            dispatch(fetchCartProductsList());
        }
    }, [cart, dispatch, favorite]);
    return (
        <div className={classNames('app', {}, [themeVariant])}>
            <Suspense fallback="">
                {isBrowser && <Header />}
                <MobileBar />
                <AppRouter />
                <Footer />
            </Suspense>
        </div>
    );
}

export default App;
