import cls from 'shared/ui/DropdownsList/ui/Select/Select.module.scss';

export type DropdownsListDirectionOpen = 'bottom' | 'top' | 'topLeft' | 'bottomLeft';

export const DropdownsListDirectionOpenClasses: Record<
    DropdownsListDirectionOpen,
    string
> = {
    top: cls.topOpen,
    bottom: cls.bottomOpen,
    topLeft: cls.topLeftOpen,
    bottomLeft: cls.bottomLeftOpen,
};
