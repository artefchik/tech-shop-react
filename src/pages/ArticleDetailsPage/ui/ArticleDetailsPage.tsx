import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Container } from 'shared/ui/Container/Container';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{id:string}>();

    if (!id) {
        return <Text title="Статья не найдена" size={TextSize.BIG} />;
    }

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <Container>
                <ArticleDetails id={id} />
            </Container>
        </div>
    );
};
export default ArticleDetailsPage;
