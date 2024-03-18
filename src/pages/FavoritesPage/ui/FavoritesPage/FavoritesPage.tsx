import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProductsFavorites } from 'features/ProductFavoriteButton';
import { useSelector } from 'react-redux';
import { getProductFavorites } from 'features/ProductFavoriteButton/model/slice/productFavoritesSlice';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import cls from './FavoritesPage.module.scss';

interface FavoritesPageProps {
    className?: string;
}

const FavoritesPage = (props: FavoritesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const favorites = useSelector(getProductFavorites.selectAll);

    useEffect(() => {
        dispatch(fetchProductsFavorites());
        console.log(favorites);
    }, [dispatch, favorites]);
    return (
        <Page className={classNames(cls.FavoritesPage, {}, [className])}>
            <Container>
                <Text text={t('Favorites')} size={TextSize.LARGE} />
            </Container>
        </Page>
    );
};

export default FavoritesPage;
