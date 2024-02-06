import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'widgets/Header';
import { getUserAuthData, getUserInitied, userActions } from 'entities/User';
import { initUserAuthData } from 'entities/User/model/services/initUserAuthData/initUserAuthData';
import { cartActions } from 'entities/Cart/model/slice/cartSlice';
import { Footer } from 'widgets/Footer';

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInitied);
    const authData = useSelector(getUserAuthData);

    //
    useEffect(() => {
        dispatch(initUserAuthData());
    }, [authData?.id, dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Header />
            <Suspense fallback="load">{inited && <AppRouter />}</Suspense>
            <Footer />
        </div>
    );
}

export default App;
