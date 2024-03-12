import React, { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
    hover?: boolean;
}

export const Icon = memo((props: IconProps) => {
    const { className, Svg, inverted, hover = true, ...otherProps } = props;

    const mods: Mods = {
        [cls.hover]: hover,
    };

    return <Svg className={classNames(cls.Icon, mods, [className])} {...otherProps} />;
});
