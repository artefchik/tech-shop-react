import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleTextBlock } from 'entities/Article/model/types/article';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
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
            className={classNames(cls.ArticleImageBlockComponent, {}, [
                className,
            ])}
        >
            {block.title && (
                <Text
                    size={TextSize.MEDIUM}
                    title={block.title}
                    className={cls.title}
                />
            )}
            <VStack gap="15">
                {block.paragraphs &&
                    block.paragraphs.map((paragraph, index) => (
                        <Text
                            key={index}
                            theme={TextTheme.TEXT}
                            text={paragraph}
                            className={cls.text}
                        />
                    ))}
            </VStack>
        </VStack>
    ),
);
