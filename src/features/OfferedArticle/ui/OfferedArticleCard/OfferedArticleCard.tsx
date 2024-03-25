import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { ArticleDetails } from 'entities/Article';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { offeredArticleDetailsReducer } from 'features/OfferedArticle/model/slice/offeredArticleSlice';
import { useSelector } from 'react-redux';
import { getOfferedArticleDetailsData } from 'features/OfferedArticle/model/selectors/getOfferedArticleDetailsData/getOfferedArticleDetailsData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';
import { fetchOfferedArticleById } from 'features/OfferedArticle/model/services/fetchOfferedArticleById/fetchOfferedArticleById';
import cls from './OfferedArticleCard.module.scss';

interface OfferedArticleCardProps {
    className?: string;
    articleId: string;
}

const reducers: ReducersList = {
    offeredArticleDetails: offeredArticleDetailsReducer,
};
export const OfferedArticleCard = (props: OfferedArticleCardProps) => {
    const { className, articleId } = props;
    const article = useSelector(getOfferedArticleDetailsData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchOfferedArticleById(articleId));
    }, [articleId, dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="15"
                className={classNames(cls.OfferedArticleCard, {}, [className])}
            >
                <ArticleDetails isLoading={false} article={article} />
            </VStack>
        </DynamicModuleLoader>
    );
};
