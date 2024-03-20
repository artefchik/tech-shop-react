import { Article, ArticleListItem } from 'entities/Article';
import { useGetMainPageArticles } from 'pages/MainPage/model/api/mainPageApi';
import { ViewType } from 'shared/const/types';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { getRoutePathArticles } from 'shared/const/router';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { MainPageCardHeader } from '../MainPageCardHeader/MainPageCardHeader';
import { MainPageCardsSlider } from '../MainPageCardsSlider/MainPageCardsSlider';

interface MainPageArticlesCardsProps {
    className?: string;
}
const getSkeletons = () =>
    new Array(6)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton key={index} view={ViewType.SMALL} />
        ));

export const MainPageArticlesCards = (props: MainPageArticlesCardsProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data: articles, isLoading } = useGetMainPageArticles({
        limit: 6,
        category: '',
        url: '',
        order: 'asc',
    });

    return (
        <VStack gap="15" As="section" className={className}>
            <MainPageCardHeader
                title={t('Articles')}
                srcLink={getRoutePathArticles()}
            />
            <MainPageCardsSlider<Article> data={articles}>
                {(article) =>
                    isLoading ? (
                        <ArticleListItemSkeleton view={ViewType.SMALL} />
                    ) : (
                        <ArticleListItem
                            article={article}
                            view={ViewType.SMALL}
                        />
                    )
                }
            </MainPageCardsSlider>
        </VStack>
    );
};
