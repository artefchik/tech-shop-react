import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: boolean;
  fullWidth?: boolean;
}

export const Card = (props: CardProps) => {
    const {
        className,
        theme = true,
        children,
        fullWidth = false,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.color]: theme,
        [cls.fullWidth]: fullWidth,
    };

    return (
        <div {...otherProps} className={classNames(cls.Card, mods, [className])}>
            {children}
        </div>
    );
};
