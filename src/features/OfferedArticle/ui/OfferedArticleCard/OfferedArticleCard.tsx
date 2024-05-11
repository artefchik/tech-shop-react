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
import { ErrorBlock } from 'shared/ui/ErrorBlock/ErrorBlock';
import { useTranslation } from 'react-i18next';
import { getIsAdminRole, getUserAuthData } from 'entities/User';
import { OfferedArticleButtons } from 'features/OfferedArticle/ui/OfferedArticleButtons/OfferedArticleButtons';
import { getOfferedArticleDetailsError } from 'features/OfferedArticle/model/selectors/getOfferedArticleDetailsError/getOfferedArticleDetailsError';
import { getOfferedArticleDetailsIsLoading } from 'features/OfferedArticle/model/selectors/getOfferedArticleDetailsIsLoading/getOfferedArticleDetailsIsLoading';
import { use } from 'i18next';
import { Button } from 'shared/ui/Button/Button';
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
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const article = useSelector(getOfferedArticleDetailsData);
    const error = useSelector(getOfferedArticleDetailsError);
    const isLoading = useSelector(getOfferedArticleDetailsIsLoading);
    const isAdmin = useSelector(getIsAdminRole);
    const userData = useSelector(getUserAuthData);

    const rejectedText = isAdmin
        ? `${t('This article was refused publication, it is under revision')}`
        : `${t(
              'The publication of the article was refused , the reason is',
          )}${article?.rejected}`;

    useEffect(() => {
        dispatch(fetchOfferedArticleById(articleId));
    }, [articleId, dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="15"
                className={classNames(cls.OfferedArticleCard, {}, [className])}
            >
                {article?.rejected && <ErrorBlock text={rejectedText} />}
                <ArticleDetails isLoading={isLoading} article={article} />
                <OfferedArticleButtons
                    isRejected={Boolean(article?.rejected)}
                    article={article}
                />
            </VStack>
        </DynamicModuleLoader>
    );
};
