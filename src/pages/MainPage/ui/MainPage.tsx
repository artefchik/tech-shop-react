import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { useCallback } from 'react';
import { Page } from 'shared/ui/Page/Page';
import cls from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const MainPage = (props: MainPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.MainPage, {}, [className])} />
    );
};
export default MainPage;
