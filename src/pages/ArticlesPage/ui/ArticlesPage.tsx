import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            ArticlesPage
        </div>
    );
};
export default ArticlesPage;
