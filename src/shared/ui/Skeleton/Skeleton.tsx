import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo, ReactNode } from 'react';
import { ViewType } from 'shared/const/types';
import { ArticleListItemSkeleton } from 'entities/Article';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

export const getSkeletons = (view: ViewType, item: ReactNode) =>
    new Array(view === ViewType.BIG ? 3 : 6)
        .fill(0)
        .map((_, index) => <div key={index}>{item}</div>);

export const Skeleton = memo((props: SkeletonProps) => {
    const { className, height, width, border = '8px' } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
        />
    );
});
