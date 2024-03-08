import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
// import avatar from 'shared/assets/icons/avatar.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import avatar from 'shared/assets/avatar.jpeg';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    size?: number;
    src?: string;
    alt?: string;
}

export const Avatar = (props: AvatarProps) => {
    const { className, src, size, alt } = props;
    const styles = useMemo<CSSProperties>(
        () => ({
            width: size || 30,
            height: size || 30,
        }),
        [size],
    );
    //
    if (!src) {
        return (
            // <div className={cls.icon} style={styles}>
            //     <Icon Svg={avatar} />
            // </div>

            <img
                src={avatar}
                alt={alt}
                className={classNames(cls.Avatar, {}, [className])}
                style={styles}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={classNames(cls.Avatar, {}, [className])}
            style={styles}
        />
    );
};
