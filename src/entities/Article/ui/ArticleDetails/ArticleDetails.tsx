import { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from 'entities/Article';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import calendar from 'shared/assets/icons/calendar.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { HStack, VStack } from 'shared/ui/Stack';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getRoutePathProfile } from 'shared/const/router';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import viewIcon from 'shared/assets/icons/view.svg';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleTypeBlock } from '../ArticleTypeBlock/ArticleTypeBlock';
import { ArticleRenderBlock } from '../ArticleRenderBlock/ArticleRenderBlock';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { fetchArticleById } from '../../model/services/fetchArticleById';
import cls from './ArticleDetails.module.scss';
import { ArticleType } from '../../model/types/article';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();
    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    const renderType = useCallback(
        (type: ArticleType) => <ArticleTypeBlock type={type} key={type} />,
        [],
    );
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
            <Text align={TextAlign.CENTER} size={TextSize.BIG} text="Статья не найдена" />
        );
    } else {
        content = (
            <>
                <HStack wrap gap="20" className={cls.headerBlock}>
                    <AppLink
                        to={getRoutePathProfile(article?.user._id || '')}
                        theme={AppLinkTheme.CLEAR}
                        className={cls.info}
                    >
                        <Avatar src={article?.user.avatar} alt={article?.user.username} />
                        <Text text={article?.user.username} theme={TextTheme.SECONDARY} />
                    </AppLink>
                    <HStack gap="5" align="center">
                        <Icon Svg={calendar} hover={false} />
                        {article?.createdAt}
                    </HStack>
                    <HStack gap="5" align="center">
                        <Icon Svg={viewIcon} hover={false} />
                        {article?.views}
                    </HStack>
                </HStack>
                <VStack gap="5" className={cls.headerBlock}>
                    <Text text={article?.title} size={TextSize.LARGE} />
                </VStack>

                {/* <div className={cls.types}>{article?.types.map(renderType)}</div> */}
                {article?.blocks.map((block) => (
                    <ArticleRenderBlock block={block} key={block._id} />
                ))}
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                <Card>{content}</Card>
            </div>
        </DynamicModuleLoader>
    );
});
