import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { memo } from 'react';
import { AppImage } from 'shared/ui/AppImage/AppImage';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    ({ className, block }: ArticleImageBlockComponentProps) => (
        <div
            className={classNames(cls.ArticleImageBlockComponent, {}, [
                className,
            ])}
        >
            {block.src && <AppImage src={block.src} className={cls.image} />}
            {block.title && (
                <Text
                    text={block.title}
                    align={TextAlign.CENTER}
                    theme={TextTheme.TEXT}
                />
            )}
        </div>
    ),
);
