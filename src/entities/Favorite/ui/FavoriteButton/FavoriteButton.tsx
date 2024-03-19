import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import favorites from 'shared/assets/icons/favorites.svg';
import { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import cls from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
    className?: string;
    onToggleFavorite?: () => void;
    isFavorite?: boolean;
    auth?: boolean;
}

export const FavoriteButton = memo((props: FavoriteButtonProps) => {
    const {
        className,
        onToggleFavorite,
        isFavorite = false,
        auth = false,
    } = props;
    const [isSelectedFavorite, setIsSelectedFavorite] = useState(isFavorite);

    const onToggleFavoriteHandler = useCallback(() => {
        if (auth) {
            setIsSelectedFavorite((prevState) => !prevState);
        }
        onToggleFavorite?.();
    }, [auth, onToggleFavorite]);

    useEffect(() => {
        setIsSelectedFavorite(isFavorite);
    }, [isFavorite]);
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
