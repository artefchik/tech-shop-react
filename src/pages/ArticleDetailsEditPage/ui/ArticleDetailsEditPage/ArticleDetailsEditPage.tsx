import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import cls from './ArticleDetailsEditPage.module.scss';

interface ArticleDetailsEditPageProps {
    className?: string;
}

const ArticleDetailsEditPage = (props: ArticleDetailsEditPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return (
        <Page
            className={classNames(cls.ArticleDetailsEditPage, {}, [className])}
        >
            <Container>{isEdit && `edit ${id}`}</Container>
        </Page>
    );
};

export default ArticleDetailsEditPage;
