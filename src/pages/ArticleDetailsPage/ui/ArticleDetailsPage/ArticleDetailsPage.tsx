import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
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
    console.log(id);
    if (!id) {
        return <Text text="Статья не найдена" size={TextSize.BIG} />;
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <Container className={cls.body}>
                    <ArticleDetailsHeaderPage />
                    <ArticleDetails articleId={id} className={cls.article} />
                    <ArticleDetailsRating articleId={id} />
                    <ArticleDetailsComment articleId={id} />
                </Container>
                <AdvantagesItemList />
            </Page>
        </DynamicModuleLoader>
    );
};
export default ArticleDetailsPage;
