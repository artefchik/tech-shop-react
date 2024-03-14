import { memo } from 'react';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleRenderBlockProps {
    block: ArticleBlock;
}

export const ArticleRenderBlock = memo(({ block }: ArticleRenderBlockProps) => {
    switch (block.type) {
        case ArticleBlockType.IMAGE:
            return <ArticleImageBlockComponent block={block} />;
        case ArticleBlockType.TEXT:
            return <ArticleTextBlockComponent block={block} />;
        default:
            return null;
    }
});
