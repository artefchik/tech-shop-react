import { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useSelector } from 'react-redux';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from 'entities/Article';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/Text';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ArticleTypeBlock } from 'entities/Article/ui/ArticleTypeBlock/ArticleTypeBlock';
import view from 'shared/assets/icons/view.svg';
import calendar from 'shared/assets/icons/calendar.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleImageBlockComponent } from '../../ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../../ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import cls from './ArticleDetails.module.scss';
import { ArticleBlock, ArticleBlockType, ArticleType } from '../../model/types/article';

interface ArticleDetailsProps {
    className?: string;
    id:string;
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();
    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    const renderType = useCallback((type:ArticleType) => <ArticleTypeBlock type={type} key={type} />, []);

    const renderBlock = useCallback((block:ArticleBlock) => {
        switch (block.type) {
        case ArticleBlockType.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            );
        case ArticleBlockType.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            );
        default:
            return null;
        }
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton height={25} width={600} className={cls.headerBlock} />
                <Skeleton height={20} width={400} className={cls.bodyInfo} />
                <Skeleton height={20} width={400} className={cls.bodyInfo} />
                <Skeleton height={300} width="100%" className={cls.block} />
                <Skeleton height={300} width="100%" className={cls.block} />
            </>

        );
    } else if (error) {
        content = (
            <Text align={TextAlign.CENTER} size={TextSize.BIG} title="Статья не найдена" />
        );
    } else {
        content = (
            <>
                <Text
                    theme={TextTheme.HEADER}
                    title={article?.title}
                    text={article?.subtitle}
                    className={cls.headerBlock}
                />
                <div className={cls.bodyInfo}>
                    <div className={cls.info}>
                        <Icon Svg={calendar} hover={false} />
                        {article?.createdAt}
                    </div>
                    <div className={cls.info}>
                        <Icon Svg={view} hover={false} />
                        {article?.views}
                    </div>
                </div>
                <div className={cls.types}>
                    {article?.type.map(renderType)}
                </div>
                {article?.blocks.map(renderBlock)}
            </>
        );
    }

    return (
        <DynamicModelLoader name="articleDetails" reducer={articleDetailsReducer}>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                <Card>
                    {content}
                </Card>
            </div>
        </DynamicModelLoader>
    );
});
