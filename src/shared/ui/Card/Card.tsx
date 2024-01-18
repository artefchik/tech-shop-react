import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import cls from './Card.module.scss';

interface CardProps {
  className?: string;
  children:ReactNode
  color?:boolean
}

export const Card = (props: CardProps) => {
    const { className, color = false, children } = props;

    const mods:Mods = {
        [cls.color]: color,
    };

    return (
        <div className={classNames(cls.Card, mods, [className])}>
            {children}
        </div>
    );
};
