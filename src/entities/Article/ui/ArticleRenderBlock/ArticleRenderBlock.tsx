import { memo, useCallback } from 'react';
import {
    ArticleBlock,
    ArticleBlockType,
} from 'entities/Article/model/types/article';
import { ArticleImageBlockComponent } from 'entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import cls from 'entities/Article/ui/ArticleDetails/ArticleDetails.module.scss';
import { ArticleTextBlockComponent } from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';

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
