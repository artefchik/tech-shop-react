import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Card } from 'shared/ui/Card/Card';
import { getArticleDetailsData } from 'entities/Article';
import cls from './ArticleDetailsHeaderPage.module.scss';
import {
    getCanEditArticleDetails,
} from '../../model/selectors/getCanEditArticleDetails/getCanEditArticleDetails';

interface ArticleDetailsHeaderPageProps {
    className?: string;
}

export const ArticleDetailsHeaderPage = (props: ArticleDetailsHeaderPageProps) => {
    const { className } = props;
    const canEdit = useSelector(getCanEditArticleDetails);
    const article = useSelector(getArticleDetailsData);

    return (
        <Card className={classNames(cls.ArticleDetailsHeaderPage, {}, [className])}>
            <AppLink to={RoutePath.articles}>Назад</AppLink>
            {
                canEdit && <AppLink to={`${RoutePath.article_details}${article?.id}/edit`}>Редактировать</AppLink>
            }
        </Card>
    );
};
