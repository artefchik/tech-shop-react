import { classNames } from 'shared/lib/classNames/classNames';
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
  // color?: LoaderColor;
  borderWidth?:number;
}

export const Loader = (props: LoaderProps) => {
    const {
        className,
        width = 15,
        height = 15,
        borderWidth = 2,
        // color = LoaderColor.DEFAULT,
    } = props;
    const styles: CSSProperties = {
        width,
        height,
        borderWidth,
    };

    return (
        <div className={classNames(cls.Loader, {}, [className])} style={styles} />
    );
};
