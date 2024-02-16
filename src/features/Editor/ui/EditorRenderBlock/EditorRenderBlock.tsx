import { ArticleBlockType } from 'entities/Article/model/types/article';
import { VStack } from 'shared/ui/Stack';
import { EditorImageBlock } from 'features/Editor/ui/EditorImageBlock/EditorImageBlock';
import { EditorBaseBlock } from 'features/Editor/ui/EditorBaseBlock/EditorBaseBlock';
import { EditorBlock, TextBlock } from 'features/Editor/model/types/editor';

interface EditorRenderBlockProps {
    onClose?: (value: string) => void;
    block: EditorBlock;
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
