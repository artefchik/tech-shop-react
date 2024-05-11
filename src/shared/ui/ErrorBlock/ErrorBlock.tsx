import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import info from 'shared/assets/icons/info.svg';
import { HStack } from 'shared/ui/Stack';
import cls from './ErrorBlock.module.scss';

interface ErrorBlockProps {
    className?: string;
    text: string;
}

export const ErrorBlock = (props: ErrorBlockProps) => {
    const { className, text } = props;
    return (
        <HStack
            gap="10"
            className={classNames(cls.ErrorBlock, {}, [className])}
        >
            <Icon Svg={info} />
            <Text text={text} As="span" />
        </HStack>
    );
};
