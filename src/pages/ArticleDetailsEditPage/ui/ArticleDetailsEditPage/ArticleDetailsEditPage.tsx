import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { Page } from 'shared/ui/Page/Page';
import cls from './ArticleDetailsEditPage.module.scss';

interface ArticleDetailsEditPageProps {
    className?: string;
}

const ArticleDetailsEditPage = (props: ArticleDetailsEditPageProps) => {
    const { className } = props;
    const { id } = useParams<{id:string}>();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(cls.ArticleDetailsEditPage, {}, [className])}>
            {
                isEdit ? `Редактирование ${id}` : 'содание'
            }
        </Page>
    );
};

export default ArticleDetailsEditPage;
