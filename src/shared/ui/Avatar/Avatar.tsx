import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  size?:number;
  src?:string;
  alt?:string
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size,
        alt,
    } = props;
    const styles = useMemo<CSSProperties>(() => ({
        width: size || 30,
        height: size || 30,
    }), [size]);

    return (
        <img src={src} alt={alt} className={classNames(cls.Avatar, {}, [className])} style={styles} />
    );
};
