import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { memo, useCallback } from 'react';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { IoCalendarSharp } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';
import { Button } from 'shared/ui/Button/Button';
import { AppLink } from 'shared/ui/AppLink/AppLink';
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
        navigate(RoutePath.article_details + article.id);
    }, [article.id, navigate]);

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;

        return (
            <article className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <Text
                        theme={TextTheme.HEADER}
                        title={article?.title}
                        text={article?.subtitle}
                        className={cls.headerBlock}
                    />
                    <div className={cls.bodyInfo}>
                        <AppLink to={`${RoutePath.profile}${article.user.id}`} className={cls.info}>
                            <Avatar
                                src={article.user.avatar}
                                alt={article.user.username}
                            />
                            <Text text={article.user.username} theme={TextTheme.USER} />
                        </AppLink>
                        <div className={cls.info}>
                            <IoCalendarSharp className={cls.icon} />
                            {article?.createdAt}
                        </div>
                        <div className={cls.info}>
                            <FaEye className={cls.icon} />
                            {article?.views}
                        </div>
                    </div>
                    <div className={cls.types}>
                        { article?.type.map(renderType)}
                    </div>
                    <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    <Button onClick={onOpenArticle}>Подробнее</Button>
                </Card>
            </article>

        );
    }

    return (
        <article className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card onClick={onOpenArticle} className={cls.card}>
                <div className={cls.image}>
                    <img src={article.img} alt={article.title} />
                </div>
                <div className={cls.body}>
                    <div className={cls.types}>
                        {article?.type.map(renderType)}
                    </div>
                    <Text title={article.title} size={TextSize.MEDIUM} className={cls.title} />
                    <div className={cls.infoWrapper}>
                        <div className={cls.user}>
                            {article.user.avatar
                && (
                    <>
                        <Avatar
                            src={article.user.avatar}
                            alt={article.user.username}
                        />
                        <Text text={article.user.username} theme={TextTheme.USER} />
                    </>
                )}
                        </div>
                        <Text text={article.createdAt} className={cls.date} theme={TextTheme.TEXT} />
                    </div>
                </div>
            </Card>
        </article>
    );
});
