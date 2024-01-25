import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Container } from 'shared/ui/Container/Container';
import { Page } from 'shared/ui/Page/Page';
import { ArticleDetailsComment } from 'features/ArticleDetailsComment';
import cls from './ArticleDetailsPage.module.scss';
import {
    ArticleDetailsHeaderPage,
} from '../ArticleDetailsHeaderPage/ArticleDetailsHeaderPage';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <Text title="Статья не найдена" size={TextSize.BIG} />;
    }

    return (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <Container className={cls.body}>
                <ArticleDetailsHeaderPage />
                <ArticleDetails id={id} className={cls.article} />
                <ArticleDetailsComment id={id} />
            </Container>
        </Page>
    );
};
export default ArticleDetailsPage;
