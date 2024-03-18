import {
    ArticleBlock,
    ArticleBlockType,
} from 'entities/Article/model/types/article';
import { VStack } from 'shared/ui/Stack';
import { EditorImageBlock } from '../EditorImageBlock/EditorImageBlock';
import { EditorBaseBlock } from '../EditorBaseBlock/EditorBaseBlock';

interface EditorRenderBlockProps {
    onClose?: (value: string) => void;
    block: ArticleBlock;
    type: ArticleBlockType;
}

export const EditorRenderBlock = (props: EditorRenderBlockProps) => {
    const { block, onClose, type } = props;

    switch (type) {
        case ArticleBlockType.IMAGE:
            return (
                <VStack width>
                    <EditorImageBlock onClose={onClose} item={block} />
                </VStack>
            );
        default:
            return <EditorBaseBlock onClose={onClose} item={block} />;
    }
};
