import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children:ReactNode
  theme?:boolean
}

export const Card = (props: CardProps) => {
    const {
        className,
        theme = true,
        children,
        ...otherProps
    } = props;

    const mods:Mods = {
        [cls.color]: theme,
    };

    return (
        <div {...otherProps} className={classNames(cls.Card, mods, [className])}>
            {children}
        </div>
    );
};
