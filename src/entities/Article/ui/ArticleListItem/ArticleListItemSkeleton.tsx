import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from 'shared/ui/Stack';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';
import cls from './ArticleListItem.module.scss';
import { ArticleView } from '../../model/types/article';

interface ArticleListItemSkeletonProps {
    className?: string;
    view: ViewType;
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props;

        if (view === ViewType.BIG) {
            return (
                <article
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <Card>
                        <VStack gap="10">
                            <HStack gap="20">
                                <Skeleton
                                    height={30}
                                    width="15%"
                                    className={cls.info}
                                />
                                <Skeleton
                                    height={30}
                                    width="15%"
                                    className={cls.info}
                                />
                                <Skeleton
                                    height={30}
                                    width="15%"
                                    className={cls.info}
                                />
                            </HStack>
                            <Skeleton height={32} width="70%" />
                            <Skeleton height={25} width="70%" />
                            <HStack gap="10">
                                <Skeleton
                                    height={24}
                                    width={80}
                                    className={cls.info}
                                />
                                <Skeleton
                                    height={24}
                                    width={80}
                                    className={cls.info}
                                />
                            </HStack>
                            <Skeleton
                                height={150}
                                width="100%"
                                className={cls.textBlock}
                            />
                            <Skeleton height={40} width={120} />
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
                <Card className={cls.card}>
                    <VStack className={cls.bodySkeleton}>
                        <Skeleton height={20} width={100} />
                        <VStack gap="10" className={cls.info}>
                            <Skeleton width="100%" height={44} />
                            <Skeleton width="100%" height={60} />
                        </VStack>
                    </VStack>
                </Card>
            </article>
        );
    },
);
