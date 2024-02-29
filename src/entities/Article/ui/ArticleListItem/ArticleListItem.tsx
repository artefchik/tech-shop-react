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
import {
    getRoutePathArticlesDetailsById,
    getRoutePathProfile,
} from 'shared/const/router';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';
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
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { className, article, view } = props;
    const navigate = useNavigate();

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
                className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
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
                                {article?.createdAt}
                            </HStack>
                            <HStack gap="5" align="center">
                                <Icon Svg={viewIcon} hover={false} />
                                {article?.views}
                            </HStack>
                        </HStack>
                        <VStack>
                            <Text text={article?.title} size={TextSize.LARGE} />
                        </VStack>
                        <HStack gap="10">{article?.types.map(renderType)}</HStack>
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={cls.textBlock}
                        />
                        <AppLink
                            to={getRoutePathArticlesDetailsById(article.id)}
                            theme={AppLinkTheme.PRIMARY}
                        >
                            Подробнее
                        </AppLink>
                    </VStack>
                </Card>
            </article>
        );
    }

    return (
        <article className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card
                onClick={onOpenArticle}
                className={classNames(cls.card, {}, [cls.flex])}
            >
                <img
                    src={`http://localhost:8000${article.img}`}
                    alt=""
                    className={cls.image}
                />
                <VStack className={cls.body}>
                    <Text
                        text={String(article.createdAt)}
                        theme={TextTheme.TEXT}
                        size={TextSize.SMALL}
                    />
                    <VStack className={cls.info} gap="5">
                        <Text
                            size={TextSize.MEDIUM}
                            text={article.title}
                            className={cls.text}
                        />
                        {/* <Text */}
                        {/*    text={textBlock.paragraph} */}
                        {/*  */}
                        {/*    size={TextSize.SMALL} */}
                        {/*    theme={TextTheme.TEXT} */}
                        {/* /> */}
                    </VStack>
                </VStack>
            </Card>
        </article>
    );
});
