import { classNames } from 'shared/lib/classNames/classNames';
import grid from 'shared/assets/icons/grid.svg';
import list from 'shared/assets/icons/listBullet.svg';
import { useCallback } from 'react';
import { HStack } from 'shared/ui/Stack';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './ViewSelector.module.scss';

export enum ViewType {
    BIG = 'big',
    SMALL = 'small',
}

const viewSelectorTypes = [
    {
        view: ViewType.SMALL,
        Icon: grid,
    },
    {
        view: ViewType.BIG,
        Icon: list,
    },
];

interface ViewSelectorProps {
    className?: string;
    view?: ViewType;
    onViewClick?: (view: ViewType) => void;
}

export const ViewSelector = (props: ViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = useCallback(
        (view: ViewType) => () => {
            onViewClick?.(view);
        },
        [onViewClick],
    );

    return (
        <HStack
            align="center"
            className={classNames(cls.ViewSelector, {}, [className])}
        >
            {viewSelectorTypes.map((viewType) => (
                <Button
                    key={viewType.view}
                    theme={ThemeButton.CLEAR}
                    onClick={onClick(viewType.view)}
                    className={classNames(
                        cls.button,
                        { [cls.selected]: viewType.view === view },
                        [className],
                    )}
                >
                    <Icon className={cls.icon} Svg={viewType.Icon} />
                </Button>
            ))}
        </HStack>
    );
};
