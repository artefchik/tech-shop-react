import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { Popover } from 'shared/ui/DropdownsList';
import { TriggerTheme } from 'shared/ui/DropdownsList/ui/Popover/Popover';
import icon from 'shared/assets/icons/plus.svg';
import { EditorBlock } from 'features/Editor/model/types/editor';
import { BrowserView, MobileView } from 'react-device-detect';
import { ArticleRenderBlock } from 'entities/Article';
import { EditorRenderBlock } from 'features/Editor/ui/EditorRenderBlock/EditorRenderBlock';
import { EditorCreateButton } from 'features/Editor/ui/EditorCreateButton/EditorCreateButton';
import { useInView } from 'react-intersection-observer';
import { EditorDeleteBlockButton } from '../EditorDeleteBlockButton/EditorDeleteBlockButton';
import { EditorBaseBlock } from '../EditorBaseBlock/EditorBaseBlock';
import { EditorImageBlock } from '../EditorImageBlock/EditorImageBlock';
import cls from './EditorBlockMain.module.scss';

interface EditorBlockMainProps {
    className?: string;
    item: EditorBlock;
    isMainTitle?: boolean;
}

export const EditorBlockMain = (props: EditorBlockMainProps) => {
    const { className, item, isMainTitle } = props;
    const [isClose, setIsClose] = useState(false);

    const { ref, inView } = useInView({
        threshold: 1,
    });

    const onClose = useCallback((value: string) => {
        console.log(value);
        setIsClose(Boolean(value));
    }, []);

    const renderBlock = (
        <EditorRenderBlock block={item} type={item.type} onClose={onClose} />
    );

    const [block, setBlock] = useState<ReactNode>(renderBlock);
    const onChangeBlock = useCallback(
        (type: ArticleBlockType) => {
            const blockItem = (
                <EditorRenderBlock block={item} type={type} onClose={onClose} />
            );
            setBlock(blockItem);
        },
        [item, onClose],
    );

    const condition = !isClose;
    console.log(isClose);
    return (
        <>
            <BrowserView>
                <HStack
                    gap="5"
                    className={classNames(cls.EditorBlockMain, {}, [className])}
                >
                    {!isClose ? (
                        <EditorCreateButton
                            onChangeBlock={onChangeBlock}
                            id={item.id}
                            className={cls.button}
                        />
                    ) : (
                        <div>lll</div>
                    )}
                    {block}
                    <EditorDeleteBlockButton id={item.id} className={cls.button} />
                </HStack>
            </BrowserView>
            {/**/}
            <MobileView>
                <div ref={ref}>
                    <HStack gap="5">
                        {block}
                        <EditorDeleteBlockButton id={item.id} />
                    </HStack>
                </div>
                <EditorCreateButton
                    onChangeBlock={onChangeBlock}
                    id={item.id}
                    row
                    showBlocks={inView}
                />
            </MobileView>
        </>
    );
};
