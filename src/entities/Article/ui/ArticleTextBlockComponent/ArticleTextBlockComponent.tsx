import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme, TextWeight } from 'shared/ui/Text/Text';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
        <VStack gap="10" className={className}>
            {block.title && (
                <Text
                    size={TextSize.BIG}
                    text={block.title}
                    weight={TextWeight.MEDIUM}
                    As="h5"
                />
            )}
            <VStack gap="15">
                {block.paragraph && (
                    <Text theme={TextTheme.TEXT} text={block.paragraph} />
                )}
            </VStack>
        </VStack>
    );
});
