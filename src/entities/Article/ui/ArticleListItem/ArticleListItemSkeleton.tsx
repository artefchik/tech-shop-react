import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from 'shared/ui/Stack';
import { ViewType } from 'shared/const/types';
import cls from './ArticleListItem.module.scss';

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
                            <Skeleton
                                height={30}
                                width={130}
                                className={cls.info}
                            />
                            <Skeleton
                                height={100}
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
                        <Skeleton height={20} width="100%" />
                        <VStack gap="10" className={cls.info}>
                            <Skeleton width="100%" height={66} />
                        </VStack>
                    </VStack>
                </Card>
            </article>
        );
    },
);
