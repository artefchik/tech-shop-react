import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleTextBlock } from 'entities/Article/model/types/article';
import { Text, TextSize, TextTheme, TextWeight } from 'shared/ui/Text/Text';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
    ({ className, block }: ArticleTextBlockComponentProps) => (
        <VStack
            gap="10"
            className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
        >
            {block.title && (
                <Text
                    size={TextSize.BIG}
                    text={block.title}
                    weight={TextWeight.MEDIUM}
                    className={cls.title}
                />
            )}
            <VStack gap="15">
                {block.paragraph && (
                    <Text
                        theme={TextTheme.TEXT}
                        text={block.paragraph}
                        className={cls.text}
                    />
                )}
            </VStack>
        </VStack>
    ),
);
