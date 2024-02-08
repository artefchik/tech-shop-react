import { classNames } from 'shared/lib/classNames/classNames';
import { Disclosure } from '@headlessui/react';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { ReactNode } from 'react';
import cls from './Spoller.module.scss';

interface SpollerProps {
    className?: string;
    title: string;
    open?: boolean;
    content: ReactNode;
}

export const Spoller = (props: SpollerProps) => {
    const { className, title, content, open = false } = props;
    return (
        <Disclosure
            as="div"
            defaultOpen={open}
            className={classNames(cls.Spoller, {}, [className])}
        >
            {({ open }) => (
                <>
                    <Disclosure.Button as="div" className={cls.trigger}>
                        <HStack justify="between" align="center" gap="20">
                            <Text title={title} />
                            <div
                                className={classNames(
                                    cls.arrow,
                                    { [cls.open]: open },
                                    [],
                                )}
                            />
                        </HStack>
                    </Disclosure.Button>
                    <Disclosure.Panel>{content}</Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};
