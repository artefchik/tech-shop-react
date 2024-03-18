import {
    CSSProperties,
    ImgHTMLAttributes,
    memo,
    ReactElement,
    useLayoutEffect,
    useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppImage.module.scss';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
    adaptive?: boolean;
    border?: string;
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt = 'image',
        errorFallback,
        fallback,
        adaptive = false,
        border,
        width,
        height,
        ...otherProps
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
        return () => {
            img.onload = null;
            img.onerror = null;
            img.src = '';
        };
    }, [src]);

    if (isLoading && fallback) {
        return fallback;
    }

    if (hasError && errorFallback) {
        return errorFallback;
    }

    const styles: CSSProperties = {
        width,
        height,
        border,
    };

    return (
        <img
            style={styles}
            className={classNames(cls.AppImage, {}, [className])}
            src={src}
            alt={alt}
            {...otherProps}
        />
    );
});
