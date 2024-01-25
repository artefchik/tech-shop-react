import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { useCallback } from 'react';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { BsFilterRight } from 'react-icons/bs';
import cls from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

const links = [
    { value: '/support', content: 'Support' },
    { value: '/license', content: 'License' },
    { value: '/sign-out', content: 'Sign out' },
];

const MainPage = (props: MainPageProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.MainPage, {}, [className])} />
    );
};
export default MainPage;
