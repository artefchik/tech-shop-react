import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { useSelector } from 'react-redux';
import { Header } from 'widgets/Header';
import { getUserAuthData, getUserInitiated, initUserAuthData } from 'entities/User';
import { Footer } from 'widgets/Footer';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isBrowser } from 'react-device-detect';
import { getMobileBarIsOpen, MobileBar } from 'features/MobileBar';
import { initFavoriteData } from 'entities/Favorite';
import { getCartId, initCartData } from 'entities/Cart';
import { fetchProductsFavorites } from 'features/ProductFavoriteButton/model/services/fetchProductsFavorites/fetchProductsFavorites';
import { getFavoriteDataId } from 'entities/Favorite/model/selectors/getFavoriteData/getFavoriteData';
import { fetchCartProductsList } from 'features/CartProduct';

import 'shared/config/i18n/i18n';

function App() {
    const { themeVariant } = useTheme();
    const dispatch = useAppDispatch();
    const initiated = useSelector(getUserInitiated);
    const userData = useSelector(getUserAuthData);
    const isOpenMobileBar = useSelector(getMobileBarIsOpen);

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
        <div className={classNames('app', { lock: isOpenMobileBar }, [themeVariant])}>
            <Suspense fallback="">
                {isBrowser && <Header />}
                <MobileBar />
                {initiated && <AppRouter />}
                <Footer />
            </Suspense>
        </div>
    );
}

export default App;
