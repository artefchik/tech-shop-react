import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { useSelector } from 'react-redux';
import { Header } from 'widgets/Header';
import { getUserAuthData, getUserInitied, initUserAuthData } from 'entities/User';
import { Footer } from 'widgets/Footer';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isBrowser, isMobile } from 'react-device-detect';
import { MobileBar } from 'features/MobileBar';
import { initFavoriteData } from 'entities/Favorite/model/services/initFavoriteData/initFavoriteData';
import { initCartData } from 'entities/Cart/model/services/initCartData/initCartData';
import { fetchProductsList } from 'pages/ProductsPage/model/services/fetchProductsList/fetchProductsList';
import { fetchCartProductsList } from 'features/CartProduct';

function App() {
    const { themeVariant } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInitied);
    const userData = useSelector(getUserAuthData);
    useEffect(() => {
        dispatch(initUserAuthData());
    }, [dispatch]);

    useEffect(() => {
        if (userData) {
            dispatch(initFavoriteData(userData.id));
            dispatch(initCartData(userData.id));
        }
    }, [dispatch, userData]);

    return (
        <div className={classNames('app', {}, [themeVariant])}>
            <Suspense fallback="">
                {isBrowser && <Header />}
                <MobileBar />
                {inited && <AppRouter />}
                <Footer />
            </Suspense>
        </div>
    );
}

export default App;
