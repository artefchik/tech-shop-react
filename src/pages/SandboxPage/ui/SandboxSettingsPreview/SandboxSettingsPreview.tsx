import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { UploadImage } from 'shared/ui/UploadImage/UploadImage';
import { useSelector } from 'react-redux';
import { Card } from 'shared/ui/Card/Card';
import { useCallback } from 'react';
import { getEditorTitle } from 'features/Editor/model/selectors/getEditorTitle/getEditorTitle';
import { ArticleRenderBlock } from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { sandboxSettingsActions } from 'features/SandboxSettings/model/slice/sandboxSettingsSlice';
import { getEditorTextBlocks } from 'features/Editor/model/selectors/getEditorBlocks/getEditorBlocks';
import { getSandboxSettingsImage } from 'features/SandboxSettings/model/selectors/getSandboxSettingsImage/getSandboxSettingsImage';
import cls from './SandboxSettingsPreview.module.scss';

interface SandboxSettingsPreviewProps {
    className?: string;
}

export const SandboxSettingsPreview = (props: SandboxSettingsPreviewProps) => {
    const { className } = props;
    const previewImage = useSelector(getSandboxSettingsImage);
    const textBlocks = useSelector(getEditorTextBlocks);
    const title = useSelector(getEditorTitle);
    const dispatch = useAppDispatch();
    const onChangePreviewImage = useCallback(
        (image: string) => {
            dispatch(sandboxSettingsActions.setPreviewImage(image));
        },
        [dispatch],
    );

    return (
        <VStack
            gap="10"
            className={classNames(cls.SandboxSettingsPreview, {}, [className])}
        >
            <Text text="Отображение статьи" />
            <VStack gap="10">
                <UploadImage
                    adaptive
                    // height={350}
                    text="Добавить обложку"
                    image={previewImage}
                    onChangeImageBlock={onChangePreviewImage}
                    className={cls.previewImage}
                />

                <Card>
                    <Text text={title} className={cls.title} />
                    <VStack gap="20">
                        {!!textBlocks?.length &&
                            textBlocks.map((textBlock) => (
                                // <ArticleRenderBlock
                                //     key={textBlock.id}
                                //     block={textBlock}
                                // />
                                <div />
                            ))}
                    </VStack>
                </Card>
            </VStack>
        </VStack>
    );
};
