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

function App() {
    const { themeVariant } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInitied);

    useEffect(() => {
        dispatch(initUserAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [themeVariant])}>
            {isBrowser && <Header />}
            <MobileBar />
            {inited && <AppRouter />}
            <Footer />
        </div>
    );
}

export default App;
