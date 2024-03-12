import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import favorites from 'shared/assets/icons/favorites.svg';
import { memo, useCallback, useState } from 'react';
import { productFavoritesActions } from 'features/ProductFavoriteButton/model/slice/productFavoritesSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
    className?: string;
    onToggleFavorite?: () => void;
    isFavorite?: boolean;
}

export const FavoriteButton = memo((props: FavoriteButtonProps) => {
    const { className, onToggleFavorite, isFavorite = false } = props;
    const [isSelectedFavorite, setIsSelectedFavorite] = useState(isFavorite);

    const onToggleFavoriteHandler = useCallback(() => {
        setIsSelectedFavorite((prevState) => !prevState);
        onToggleFavorite?.();
    }, [onToggleFavorite]);

    return (
        <Button
            onClick={onToggleFavoriteHandler}
            className={classNames(
                cls.FavoriteButton,
                { [cls.active]: isSelectedFavorite },
                [className],
            )}
            theme={ThemeButton.CLEAR}
        >
            <Icon
                hover={false}
                Svg={favorites}
                className={classNames(
                    cls.favorites,
                    { [cls.active]: isSelectedFavorite },
                    [],
                )}
            />
        </Button>
    );
});
