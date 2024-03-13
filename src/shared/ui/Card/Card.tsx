import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss';

type TagType = 'div' | 'section' | 'article';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    theme?: boolean;
    fullWidth?: boolean;
    As?: TagType;
}

export const Card = (props: CardProps) => {
    const {
        className,
        theme = true,
        children,
        As = 'div',
        fullWidth = false,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.color]: theme,
        [cls.fullWidth]: fullWidth,
    };

    return (
        <As {...otherProps} className={classNames(cls.Card, mods, [className])}>
            {children}
        </As>
    );
};
