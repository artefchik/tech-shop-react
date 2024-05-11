import { Page } from 'shared/ui/Page/Page';
import { useSelector } from 'react-redux';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Container } from 'shared/ui/Container/Container';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleListItem } from 'entities/Article';
import { ViewType } from 'shared/const/types';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from 'shared/ui/Stack';
import { OfferedArticlesList } from 'widgets/OfferedArticlesList';
import { getOfferedArticlesData } from '../../model/selectors/getOfferedArticlesData/getOfferedArticlesData';
import { fetchOfferedArticles } from '../../model/services/fetchOfferedArticles/fetchOfferedArticles';
import { offeredArticlesPageReducer } from '../../model/slice/offeredArticlesPageSlice';

interface OfferedArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    offeredArticlesPage: offeredArticlesPageReducer,
};

const OfferedArticlesPage = (props: OfferedArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const articles = useSelector(getOfferedArticlesData);

    useEffect(() => {
        dispatch(fetchOfferedArticles({}));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page isBottomPadding>
                <Container>
                    <VStack gap="15">
                        <Text
                            text={t('Offered articles')}
                            size={TextSize.LARGE}
                            As="h3"
                        />
                        <OfferedArticlesList articles={articles} />
                    </VStack>
                </Container>
            </Page>
        </DynamicModuleLoader>
    );
};

export default OfferedArticlesPage;
