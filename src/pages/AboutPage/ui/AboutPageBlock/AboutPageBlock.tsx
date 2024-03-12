import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Flex } from 'shared/ui/Stack/Flex/Flex';
import cls from './AboutPageBlock.module.scss';
import { AboutPageItem } from '../../model/types/about';

interface AboutPageBlockProps {
    className?: string;
    block: AboutPageItem;
}

export const AboutPageBlock = (props: AboutPageBlockProps) => {
    const { className, block } = props;
    const mods: Mods = {
        [cls.reverse]: block.isReverse,
    };
    const reverse = block.isReverse ? 'rowReverse' : 'row';

    return (
        <section className={classNames('', mods, [])}>
            <Flex
                gap="20"
                direction={reverse}
                className={classNames(cls.AboutPageBlock, {}, [className])}
            >
                <div className={cls.image}>
                    <img src={block.image} alt="" />
                </div>
                <VStack className={cls.block}>
                    <VStack className={cls.content} gap="20">
                        <VStack gap="5">
                            <div className={cls.icon}>
                                <Icon Svg={block.icon} hover={false} />
                            </div>
                            <Text
                                text={block.title}
                                className={cls.text}
                                size={TextSize.LARGE}
                                As="h4"
                            />
                        </VStack>
                        <VStack gap="15">
                            {block.paragraphs?.map((paragraph, index) => (
                                <Text className={cls.text} key={index} text={paragraph} />
                            ))}
                        </VStack>
                    </VStack>
                </VStack>
            </Flex>
        </section>
    );
};
