import { classNames } from 'shared/lib/classNames/classNames';
import React, { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { HStack } from 'shared/ui/Stack';
import { Icon } from 'shared/ui/Icon/Icon';
import check from 'shared/assets/icons/check.svg';
import cls from './DropdownBox.module.scss';

export interface DropdownBoxItem {
    content: string;
    value: string;
}

interface DropdownBoxProps {
    className?: string;
    items: DropdownBoxItem[];
    onChange?: (items: DropdownBoxItem[]) => void;
}

export function DropdownBox(props: DropdownBoxProps) {
    const { className, items, onChange } = props;

    const [selectedItems, setSelectedItems] = useState<DropdownBoxItem[]>([]);
    const [query, setQuery] = useState('');
    console.log(selectedItems);
    const filteredItems =
        query === ''
            ? items
            : items.filter((item) =>
                  item.content.toLowerCase().includes(query.toLowerCase()),
              );

    const onChangeHandler = (value: any) => {
        setSelectedItems(value);
        onChange?.(value);
    };

    return (
        <Combobox
            as="div"
            value={selectedItems}
            onChange={onChangeHandler}
            className={classNames(cls.DropdownBox, {}, [className])}
            // @ts-ignore
            multiple
        >
            {({ open }) => (
                <>
                    <HStack
                        className={classNames(cls.body, { [cls.open]: open }, [
                            className,
                        ])}
                        align="center"
                        gap="10"
                    >
                        <Combobox.Input
                            onChange={(event) => setQuery(event.target.value)}
                            className={classNames(cls.input, {}, [className])}
                            displayValue={(selectedItems: string[]) =>
                                selectedItems.join(',')
                            }
                            placeholder="Выберите категории статьи"
                        />
                        <Combobox.Button
                            className={classNames(
                                cls.triggerButton,
                                { [cls.open]: open },
                                [className],
                            )}
                        />
                    </HStack>
                    <Transition
                        enter="transition ease duration-350"
                        enterFrom="opacity-30"
                        enterTo="opacity-90"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Combobox.Options as="ul" className={cls.list}>
                            {filteredItems.map((item) => (
                                <Combobox.Option
                                    key={item.value}
                                    value={item.value}
                                    as={Fragment}
                                >
                                    {({ active, selected }) => (
                                        <li
                                            className={classNames(cls.item, {
                                                [cls.active]: active,
                                                [cls.selected]: selected,
                                            })}
                                        >
                                            {selected && (
                                                <Icon
                                                    hover={false}
                                                    Svg={check}
                                                    className={cls.icon}
                                                />
                                            )}
                                            {item}
                                        </li>
                                    )}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </Transition>
                </>
            )}
        </Combobox>
    );
}
