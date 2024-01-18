import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'widgets/Header';
import { userActions } from 'entities/User';

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    // const inited = useSelector(getUserInited);
    //
    useEffect(() => {
        dispatch(userActions.setInitAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Header />
            <Suspense fallback="load">
                <AppRouter />
            </Suspense>
        </div>
    );
}

export default App;
