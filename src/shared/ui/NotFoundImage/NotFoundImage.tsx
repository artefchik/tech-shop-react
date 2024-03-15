import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import notFound from 'shared/assets/icons/notfound.svg';
import { CSSProperties, useMemo } from 'react';
import cls from './NotFoundImage.module.scss';

interface NotFoundImageProps {
    className?: string;
    height?: string | number;
    width?: string | number;
}

export const NotFoundImage = (props: NotFoundImageProps) => {
    const { className, width = '100%', height = '100%' } = props;
    const styles: CSSProperties = {
        width,
        height,
    };

    return (
        <div
            style={styles}
            className={classNames(cls.NotFoundImage, {}, [className])}
        >
            <Icon hover={false} Svg={notFound} />
        </div>
    );
};
