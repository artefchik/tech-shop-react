import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { memo, useCallback } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import viewIcon from 'shared/assets/icons/view.svg';
import calendar from 'shared/assets/icons/calendar.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { HStack, VStack } from 'shared/ui/Stack';
import { getRoutePathArticlesDetailsById, getRoutePathProfile, RoutePath } from 'shared/const/router';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';
import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleType, ArticleView,
} from '../../model/types/article';
import { ArticleTypeBlock } from '../ArticleTypeBlock/ArticleTypeBlock';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view } = props;
    const navigate = useNavigate();

    const renderType = useCallback((type: ArticleType) => <ArticleTypeBlock type={type} key={type} />, []);

    const onOpenArticle = useCallback(() => {
        navigate(getRoutePathArticlesDetailsById(article.id));
    }, [article.id, navigate]);

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <article className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
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
                                <Text text={article.user.username} theme={TextTheme.USER} />
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
                        <Text
                            theme={TextTheme.HEADER}
                            title={article?.title}
                            text={article?.subtitle}
                        />
                        <HStack gap="10">
                            { article?.type.map(renderType)}
                        </HStack>
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                        <AppLink to={getRoutePathArticlesDetailsById(article.id)} theme={AppLinkTheme.PRIMARY}>
                            Подробнее
                        </AppLink>
                    </VStack>
                </Card>
            </article>

        );
    }

    return (
        <article className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card onClick={onOpenArticle} className={cls.card}>
                <VStack gap="10">
                    <div className={cls.image}>
                        <img src={article.img} alt={article.title} />
                    </div>
                    <VStack width gap="10">
                        <HStack gap="10" className={cls.types}>
                            {article?.type.map(renderType)}
                        </HStack>
                        <Text title={article.title} size={TextSize.DEFAULT} className={cls.title} />
                        <HStack align="center" justify="between">
                            <AppLink
                                to={getRoutePathProfile(article.user.id)}
                                className={cls.info}
                                theme={AppLinkTheme.CLEAR}
                            >
                                <Avatar
                                    src={article.user.avatar}
                                    alt={article.user.username}
                                />
                                <Text text={article.user.username} theme={TextTheme.USER} />
                            </AppLink>
                            <Text text={article.createdAt} className={cls.date} theme={TextTheme.TEXT} />
                        </HStack>
                    </VStack>
                </VStack>
            </Card>
        </article>
    );
});
