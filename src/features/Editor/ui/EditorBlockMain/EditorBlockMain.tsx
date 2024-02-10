import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { Popover } from 'shared/ui/DropdownsList';
import { TriggerTheme } from 'shared/ui/DropdownsList/ui/Popover/Popover';
import icon from 'shared/assets/icons/plus.svg';
import { EditorBlock } from 'features/Editor/model/types/editor';
import { BrowserView, MobileView } from 'react-device-detect';
import { EditorDeleteBlockButton } from '../EditorDeleteBlockButton/EditorDeleteBlockButton';
import { EditorBaseBlock } from '../EditorBaseBlock/EditorBaseBlock';
import { EditorImageBlock } from '../EditorImageBlock/EditorImageBlock';
import { EditorCreateBlockButtonItems } from '../EditorCreateBlockButtonItems/EditorCreateBlockButtonItems';
import cls from './EditorBlockMain.module.scss';

interface EditorBlockMainProps {
    className?: string;
    item: EditorBlock;
    isMainTitle?: boolean;
}

export const EditorBlockMain = (props: EditorBlockMainProps) => {
    const { className, item, isMainTitle } = props;
    const [isClose, setIsClose] = useState(false);
    const createButton = useRef<HTMLDivElement>(null);

    const onClose = useCallback((value: string) => {
        setIsClose(Boolean(value));
    }, []);
    const renderBlock = useCallback(
        (type: ArticleBlockType) => {
            switch (type) {
                case ArticleBlockType.IMAGE:
                    return (
                        <VStack width>
                            <EditorImageBlock
                                onClose={onClose}
                                item={{
                                    id: item.id,
                                    type: ArticleBlockType.IMAGE,
                                    title: '',
                                    image: '',
                                }}
                            />
                            <EditorBaseBlock
                                onClose={onClose}
                                item={{
                                    id: String(Date.now()),
                                    type: ArticleBlockType.TEXT,
                                    title: '',
                                    paragraphs: [],
                                }}
                            />
                        </VStack>
                    );

                default:
                    return (
                        <EditorBaseBlock
                            onClose={onClose}
                            item={{
                                id: item.id,
                                type: ArticleBlockType.TEXT,
                                title: '',
                                paragraphs: [],
                            }}
                        />
                    );
            }
        },
        [item.id, onClose],
    );

    const [block, setBlock] = useState<ReactNode>(renderBlock(item.type));
    const onChangeBlock = useCallback(
        (type: ArticleBlockType) => {
            renderBlock(type);
            setBlock(renderBlock(type));
        },
        [renderBlock],
    );

    const condition = !isClose || item.type === ArticleBlockType.IMAGE;
    return (
        <>
            <BrowserView>
                <HStack
                    gap="5"
                    className={classNames(cls.EditorBlockMain, {}, [className])}
                >
                    <div className={cls.button} ref={createButton}>
                        {condition && (
                            <Popover
                                triggerTheme={TriggerTheme.CLEAR}
                                icon={icon}
                                height={2 * 44}
                            >
                                <EditorCreateBlockButtonItems
                                    changeBlock={onChangeBlock}
                                    id={item.id}
                                />
                            </Popover>
                        )}
                    </div>
                    {block}
                    <div className={cls.button}>
                        {/* {isClose && <EditorDeleteBlockButton id={item.id} />} */}
                    </div>
                </HStack>
            </BrowserView>
            <MobileView>
                <HStack gap="5">
                    {block}
                    <EditorDeleteBlockButton id={item.id} />
                </HStack>
                <div className={cls.bodyMobile}>
                    <EditorCreateBlockButtonItems
                        row
                        changeBlock={onChangeBlock}
                        id={item.id}
                    />
                </div>
            </MobileView>
        </>
    );
};
