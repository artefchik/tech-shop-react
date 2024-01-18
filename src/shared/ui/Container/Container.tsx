import { FC, ReactNode } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Container.module.scss';

interface ContainerProps {
    className?: string;
    children:ReactNode
}

export const Container = ({ className, children }:ContainerProps) => (
    <div className={classNames(cls.Container, {}, [className])}>
        {children}
    </div>
);
