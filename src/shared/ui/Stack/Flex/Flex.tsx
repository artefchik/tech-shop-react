import { classNames } from 'shared/lib/classNames/classNames';
import {
    DetailedHTMLProps, HTMLAttributes, ReactNode, useMemo,
} from 'react';
import cls from './Flex.module.scss';

type FlexJustify = 'center' | 'start' | 'end' | 'between'
type FlexAlign = 'center' | 'start' | 'end' | 'stretch'
type FlexGap = '10' | '15' | '20' | '25' | '30'
type FlexDirection = 'row' | 'column'

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
  className?: string;
  children?:ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction?:FlexDirection;
  gap?:FlexGap
}

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
    stretch: cls.alignStretch,
};

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
    10: cls.gap10,
    15: cls.gap15,
    20: cls.gap20,
    25: cls.gap25,
    30: cls.gap30,
};

export const Flex = (props: FlexProps) => {
    const {
        children,
        className,
        justify = 'start',
        align = 'start',
        direction = 'row',
        gap,
    } = props;

    const classes = useMemo(() => [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],

    ], [align, className, direction, gap, justify]);

    return (
        <div className={classNames(cls.Flex, {}, classes)}>
            {children}
        </div>
    );
};
