import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Container } from 'shared/ui/Container/Container';
import { Page } from 'shared/ui/Page/Page';
import { ArticleDetailsComment } from 'features/ArticleDetailsComment';
import {
    ArticleDetailsRating,
    articleDetailsRatingReducer,
} from 'features/ArticleDetailsRating';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AdvantagesItemList } from 'widgets/Advantages';
import { ArticleDetailsCard } from 'widgets/ArticleDetailsCard';
import { EmptySearch } from 'shared/ui/EmptySearch/EmptySearch';
import { useSelector } from 'react-redux';
import { getArticleDetailsError } from 'entities/Article';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { getRoutePathArticles } from 'shared/const/router';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsHeaderPage } from '../ArticleDetailsHeaderPage/ArticleDetailsHeaderPage';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsRating: articleDetailsRatingReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const error = useSelector(getArticleDetailsError);
    const { t } = useTranslation();

    if (!id) {
        return <Text text="Статья не найдена" size={TextSize.BIG} />;
    }

    let content;

    if (error) {
        content = (
            <VStack align="center" gap="15">
                <EmptySearch text={t('The article not found')} />
                <AppLink to={getRoutePathArticles()}>
                    {t('All articles')}
                </AppLink>
            </VStack>
        );
    } else {
        content = (
            <>
                <ArticleDetailsHeaderPage />
                <ArticleDetailsCard articleId={id} className={cls.article} />
                <ArticleDetailsRating articleId={id} />
                <ArticleDetailsComment articleId={id} />
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <Container className={cls.body}>{content}</Container>
                <AdvantagesItemList />
            </Page>
        </DynamicModuleLoader>
    );
};
export default ArticleDetailsPage;
