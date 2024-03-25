import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { memo, ReactNode, useCallback } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import viewIcon from 'shared/assets/icons/view.svg';
import calendar from 'shared/assets/icons/calendar.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    getRoutePathArticlesDetailsById,
    getRoutePathOfferedArticlesById,
    getRoutePathProfile,
} from 'shared/const/router';
import { timeAgo } from 'shared/lib/helpers/date';
import { ViewType } from 'shared/const/types';
import { useTranslation } from 'react-i18next';
import { AppImage } from 'shared/ui/AppImage/AppImage';
import { NotFoundImage } from 'shared/ui/NotFoundImage/NotFoundImage';
import { ARTICLE_ITEM_ID_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';
import {
    Article,
    ArticleBlockType,
    ArticleTextBlock,
    ArticleType,
} from '../../model/types/article';
import { ArticleTypeBlock } from '../ArticleTypeBlock/ArticleTypeBlock';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ViewType;
    index?: number;
    isOffered?: boolean;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view, index, isOffered = false } = props;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const renderType = useCallback(
        (type: ArticleType) => <ArticleTypeBlock type={type} key={type} />,
        [],
    );

    const onOpenArticle = useCallback(() => {
        navigate(getRoutePathArticlesDetailsById(article.id));
    }, [article.id, navigate]);

    const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    if (view === ViewType.BIG) {
        return (
            <article
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card>
                    <VStack gap="10" className={cls.body}>
                        <HStack wrap gap="20">
                            <AppLink
                                to={getRoutePathProfile(article.user.id)}
                                className={cls.info}
                                theme={AppLinkTheme.CLEAR}
                            >
                                <Avatar
                                    src={article.user.avatar}
                                    alt={article.user.username}
                                />
                                <Text text={article.user.username} />
                            </AppLink>
                            <HStack gap="5" align="center">
                                <Icon Svg={calendar} hover={false} />
                                <Text text={timeAgo(article?.createdAt)} />
                            </HStack>
                            <HStack gap="5" align="center">
                                <Icon Svg={viewIcon} hover={false} />
                                <Text text={String(article.views)} As="span" />
                            </HStack>
                        </HStack>
                        <VStack>
                            <Text text={article?.title} size={TextSize.LARGE} />
                        </VStack>
                        <HStack gap="10">
                            {article?.types.map(renderType)}
                        </HStack>
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={cls.textBlock}
                        />
                        <AppLink
                            to={
                                isOffered
                                    ? getRoutePathOfferedArticlesById(
                                          article.id,
                                      )
                                    : getRoutePathArticlesDetailsById(
                                          article.id,
                                      )
                            }
                            theme={AppLinkTheme.PRIMARY}
                        >
                            <Text text={t('Read more')} />
                        </AppLink>
                    </VStack>
                </Card>
            </article>
        );
    }

    return (
        <article
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
        >
            <Card
                onClick={onOpenArticle}
                className={classNames(cls.card, {}, [cls.flex])}
            >
                <AppImage
                    src={article.img}
                    alt=""
                    fallback={<Skeleton className={cls.image} />}
                    errorFallback={
                        <NotFoundImage
                            className={classNames(cls.image, {}, [
                                cls.notFound,
                            ])}
                        />
                    }
                    className={cls.image}
                />
                <VStack className={cls.body}>
                    <HStack justify="between" align="center">
                        <Text
                            text={timeAgo(article.createdAt)}
                            theme={TextTheme.TEXT}
                            size={TextSize.SMALL}
                        />
                        <HStack gap="5" align="center">
                            <Icon Svg={viewIcon} hover={false} />
                            <Text
                                text={String(article.views)}
                                size={TextSize.SMALL}
                                As="span"
                            />
                        </HStack>
                    </HStack>
                    <VStack className={cls.info} gap="5">
                        <Text
                            As="h5"
                            size={TextSize.MEDIUM}
                            text={article.title}
                            className={cls.text}
                        />
                    </VStack>
                </VStack>
            </Card>
        </article>
    );
});
