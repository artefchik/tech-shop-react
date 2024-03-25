import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Page } from 'shared/ui/Page/Page';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import {
    getRoutePathArticles,
    getRoutePathOfferedArticles,
    getRoutePathOfferedArticlesById,
} from 'shared/const/router';
import { useTranslation } from 'react-i18next';
import { Container } from 'shared/ui/Container/Container';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { OfferedArticleCard } from 'features/OfferedArticle/ui/OfferedArticleCard/OfferedArticleCard';
import { OfferedArticleButtons } from 'features/OfferedArticle/ui/OfferedArticleButtons/OfferedArticleButtons';
import { VStack } from 'shared/ui/Stack';
import cls from './OfferedArticleDetailsPage.module.scss';

interface OfferedArticleDetailsPageProps {
    className?: string;
}

const OfferedArticleDetailsPage = (props: OfferedArticleDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    if (!id) {
        return <Text text="Статья не найдена" size={TextSize.BIG} />;
    }

    return (
        <Page isBottomPadding>
            <Container>
                <VStack gap="15">
                    <div>
                        <AppLink to={getRoutePathOfferedArticles()}>
                            {t('Back')}
                        </AppLink>
                    </div>
                    <OfferedArticleCard articleId={id} />
                    <OfferedArticleButtons articleId={id} />
                </VStack>
            </Container>
        </Page>
    );
};
export default OfferedArticleDetailsPage;
