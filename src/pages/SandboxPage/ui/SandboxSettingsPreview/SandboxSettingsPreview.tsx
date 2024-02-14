import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { UploadImage } from 'shared/ui/UploadImage/UploadImage';
import { editorBlocks } from 'features/Editor/model/selectors/getEditorBlocks/getEditorBlocks';
import { useSelector } from 'react-redux';
import { Card } from 'shared/ui/Card/Card';
import { useCallback } from 'react';
import {
    ArticleBlock,
    ArticleBlockType,
} from 'entities/Article/model/types/article';
import { getEditorTitle } from 'features/Editor/model/selectors/getEditorTitle/getEditorTitle';
import { ArticleRenderBlock } from 'entities/Article';
import cls from './SandboxSettingsPreview.module.scss';

interface SandboxSettingsPreviewProps {
    className?: string;
}

export const SandboxSettingsPreview = (props: SandboxSettingsPreviewProps) => {
    const { className } = props;

    const textBlocks = useSelector(editorBlocks);
    const title = useSelector(getEditorTitle);

    return (
        <VStack
            gap="15"
            className={classNames(cls.SandboxSettingsPreview, {}, [className])}
        >
            <Text theme={TextTheme.HEADER} title="Отображение статьи" />
            <VStack gap="10">
                {/* <UploadImage height={400} text="Добавить обложку"  item/> */}

                <Card>
                    <Text
                        title={title}
                        theme={TextTheme.HEADER}
                        className={cls.title}
                    />
                    <VStack gap="20">
                        {textBlocks?.map((textBlock) => (
                            <ArticleRenderBlock
                                key={textBlock.id}
                                block={textBlock}
                            />
                        ))}
                    </VStack>
                </Card>
            </VStack>
        </VStack>
    );
};
