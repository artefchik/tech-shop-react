import { classNames } from 'shared/lib/classNames/classNames';
import emptySearch from 'shared/assets/icons/empty-seacrh.svg';
import { VStack } from 'shared/ui/Stack';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text, TextSize, TextTheme, TextWeight } from 'shared/ui/Text/Text';
import cls from './EmptySearch.module.scss';

interface EmptySearchProps {
    className?: string;
    text: string;
}

export const EmptySearch = (props: EmptySearchProps) => {
    const { className, text } = props;
    return (
        <VStack
            align="center"
            gap="15"
            className={classNames(cls.EmptySearch, {}, [className])}
        >
            <Icon Svg={emptySearch} hover={false} />
            <Text text={text} size={TextSize.BIG} weight={TextWeight.SEMI} />
        </VStack>
    );
};
