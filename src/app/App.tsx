import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { useSelector } from 'react-redux';
import { Header } from 'widgets/Header';
import { getUserAuthData, getUserInitied, initUserAuthData } from 'entities/User';
import { Footer } from 'widgets/Footer';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInitied);

    useEffect(() => {
        dispatch(initUserAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Header />
            {inited && <AppRouter />}
            <Footer />
        </div>
    );
}

export default App;
