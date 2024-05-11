import { OfferedArticle } from 'features/OfferedArticle';
import { ArticleListItem } from 'entities/Article';
import { ViewType } from 'shared/const/types';
import { VStack } from 'shared/ui/Stack';

interface OfferedArticlesListProps {
    className?: string;
    articles?: OfferedArticle[];
}

export const OfferedArticlesList = (props: OfferedArticlesListProps) => {
    const { className, articles } = props;
    return (
        <VStack gap="15" className={className}>
            {!!articles?.length &&
                articles?.map((article) => (
                    <ArticleListItem
                        key={article.id}
                        article={article}
                        view={ViewType.BIG}
                        isOffered
                        rejected={Boolean(article.rejected)}
                    />
                ))}
        </VStack>
    );
};
