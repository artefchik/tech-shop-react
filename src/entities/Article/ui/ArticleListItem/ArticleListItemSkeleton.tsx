import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

interface ArticleListItemSkeletonProps {
    className?: string;
    view:ArticleView
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ArticleView.BIG) {
        return (
            <article className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.headerBlock}>
                        <Skeleton height={30} width={600} />
                    </div>
                    <div className={cls.headerBlock}>
                        <Skeleton height={25} width={600} />
                    </div>
                    <div className={cls.bodyInfo}>
                        <Skeleton height={22} width={120} className={cls.info} />
                        <Skeleton height={22} width={110} className={cls.info} />
                        <Skeleton height={22} width={110} className={cls.info} />
                    </div>
                    <div className={cls.types}>
                        <Skeleton height={24} width={80} className={cls.info} />
                        <Skeleton height={24} width={80} className={cls.info} />
                    </div>
                    <Skeleton height={150} width="100%" className={cls.textBlock} />
                    <Skeleton height={40} width={120} />
                </Card>
            </article>

        );
    }

    return (
        <article className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card className={cls.card}>
                <div className={cls.image}>
                    <Skeleton height={230} width="100%" />
                </div>
                <div className={cls.body}>
                    <div className={cls.types}>
                        <Skeleton height={20} width={80} />
                        <Skeleton height={20} width={80} />
                    </div>
                    <Skeleton height={20} width="100%" className={cls.title} />
                    <div className={cls.infoWrapper}>
                        <div className={cls.user}>
                            <Skeleton height={30} width={30} border="50%" />
                            <Skeleton height={20} width={120} />
                        </div>
                        <Skeleton height={20} width={90} className={cls.date} />
                    </div>
                </div>
            </Card>
        </article>

    );
});
