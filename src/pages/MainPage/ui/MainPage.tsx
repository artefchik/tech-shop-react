import { classNames } from 'shared/lib/classNames/classNames';
import { useEffect } from 'react';
import axios from 'axios';
import { Article } from 'entities/Article';
import { Loader } from 'shared/ui/Loader/Loader';
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
