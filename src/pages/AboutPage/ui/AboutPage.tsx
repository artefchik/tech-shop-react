import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AboutPage.module.scss';

interface AboutPageProps {
    className?: string;
}

const AboutPage = ({ className }: AboutPageProps) => (
    <div className={classNames(cls.AboutPage, {}, [className])}>
        AboutPage
    </div>
);
export default AboutPage;
