import { CSSProperties, FC, ReactNode } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import cls from './Container.module.scss';

interface ContainerProps {
    className?: string;
    children: ReactNode;
    width?: string | number;
}

export const Container = (props: ContainerProps) => {
    const { children, width, className } = props;

    const styles: CSSProperties = {
        maxWidth: width,
    };

    return (
        <div
            style={styles}
            className={classNames(cls.Container, {}, [className])}
        >
            {children}
        </div>
    );
};
