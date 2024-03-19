import { classNames } from 'shared/lib/classNames/classNames';
import { Advantages } from 'widgets/Advantages/model/types/advantages';
import { VStack } from 'shared/ui/Stack';
import { Icon } from 'shared/ui/Icon/Icon';
import {
    Text,
    TextAlign,
    TextSize,
    TextTheme,
    TextWeight,
} from 'shared/ui/Text/Text';
import cls from './AdvantagesItem.module.scss';

interface AdvantagesItemProps {
    className?: string;
    advantages: Advantages;
}

export const AdvantagesItem = (props: AdvantagesItemProps) => {
    const { className, advantages } = props;
    return (
        <VStack
            align="center"
            gap="15"
            className={classNames(cls.AdvantagesItem, {}, [className])}
        >
            <div className={cls.icon}>
                <Icon Svg={advantages.icon} hover={false} />
            </div>
            <VStack gap="5" align="center">
                <Text
                    text={advantages.title}
                    weight={TextWeight.MEDIUM}
                    size={TextSize.BIG}
                    As="h5"
                />
                <Text
                    text={advantages.text}
                    align={TextAlign.CENTER}
                    theme={TextTheme.TEXT}
                />
            </VStack>
        </VStack>
    );
};
