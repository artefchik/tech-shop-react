import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, ReactNode, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import check from 'shared/assets/icons/check.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { DropdownsListDirectionOpenClasses } from '../../styles/const';
import cls from './Select.module.scss';
import clsDrop from '../../styles/DropdownsList.module.scss';

type SelectDirectionOpen = 'bottom' | 'top' | 'topLeft' | 'bottomLeft';

export interface SelectItem {
    value: string;
    content: ReactNode;
}

interface SelectProps {
    className?: string;
    defaultValue: string;
    value: string;
    onChange?: (value: string) => void;
    onClearValue?: () => void;
    items: SelectItem[];
    readonly?: boolean;
    icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
    open?: SelectDirectionOpen;
}

export const Select = (props: SelectProps) => {
    const {
        className,
        defaultValue,
        value,
        onChange,
        items,
        readonly,
        icon,
        open = 'bottom',
        onClearValue,
    } = props;

    const classes = useMemo(
        () => [className, DropdownsListDirectionOpenClasses[open]],
        [className, open],
    );

    return (
        <Listbox
            as="div"
            value={value}
            onChange={onChange}
            className={classNames(clsDrop.DropdownsList, {}, [className])}
        >
            {({ open }) => (
                <>
                    <Listbox.Button
                        as="div"
                        className={classNames(clsDrop.trigger, {}, [
                            className,
                            cls.selectTrigger,
                        ])}
                    >
                        <span className={clsDrop.bodyText}>{defaultValue}</span>

                        {value === defaultValue ? (
                            <Button
                                onClick={onClearValue}
                                theme={ThemeButton.DELETE}
                                className={cls.clearBtn}
                            />
                        ) : (
                            <span
                                className={classNames(
                                    cls.openIcon,
                                    { [cls.open]: open },
                                    [],
                                )}
                            />
                        )}
                        {/* <span */}
                        {/*    className={classNames( */}
                        {/*        cls.openIcon, */}
                        {/*        { [cls.open]: open }, */}
                        {/*        [], */}
                        {/*    )} */}
                        {/* /> */}
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-130"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            as="ul"
                            className={classNames(cls.options, {}, classes)}
                        >
                            {items?.map((item) => (
                                <Listbox.Option
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
                                            {item.content}
                                        </li>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </>
            )}
        </Listbox>
    );
};
