import { useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
    className?: string;
    id:string;
}

export const ArticleDetails = (props: ArticleDetailsProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    return (
        <DynamicModelLoader name="articleDetails" reducer={articleDetailsReducer}>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                ArticleDetails
            </div>
        </DynamicModelLoader>
    );
};
