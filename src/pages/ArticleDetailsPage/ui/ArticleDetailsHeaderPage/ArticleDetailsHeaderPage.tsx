import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Card } from 'shared/ui/Card/Card';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticleDetails } from 'features/ArticleDetailsComment/model/selectors/getCanEditArticleDetails/getCanEditArticleDetails';
import {
    getRoutePathArticles,
    getRoutePathArticlesEditById,
    RoutePath,
} from 'shared/const/router';
import { useTranslation } from 'react-i18next';
import cls from './ArticleDetailsHeaderPage.module.scss';

interface ArticleDetailsHeaderPageProps {
    className?: string;
}

export const ArticleDetailsHeaderPage = (
    props: ArticleDetailsHeaderPageProps,
) => {
    const { className } = props;
    const canEdit = useSelector(getCanEditArticleDetails);
    const article = useSelector(getArticleDetailsData);
    const { t } = useTranslation();
    return (
        <Card
            className={classNames(cls.ArticleDetailsHeaderPage, {}, [
                className,
            ])}
        >
            <AppLink to={getRoutePathArticles()}>{t('Back')}</AppLink>
            {canEdit && (
                <AppLink to={getRoutePathArticlesEditById(article?.id ?? '')}>
                    Редактировать
                </AppLink>
            )}
        </Card>
    );
};
