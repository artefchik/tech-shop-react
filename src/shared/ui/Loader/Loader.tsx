import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { CSSProperties } from 'react';
import cls from './Loader.module.scss';

export enum LoaderColor {
  DEFAULT = 'default',
  SECONDARY = 'secondary'
}

interface LoaderProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: LoaderColor;
}

export const Loader = (props: LoaderProps) => {
    const {
        className,
        width,
        height,
        color = LoaderColor.DEFAULT,
    } = props;
    const styles: CSSProperties = {
        width,
        height,
    };

    return (
        <div className={classNames(cls.Loader, {}, [className, color])} style={styles} />
    );
};
