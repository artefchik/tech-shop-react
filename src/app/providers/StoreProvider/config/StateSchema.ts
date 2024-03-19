import { UserSchema } from 'entities/User';
import {
    AnyAction,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { To } from 'history';
import { NavigateOptions } from 'react-router';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ArticleFiltersSchema } from 'features/ArticleFilters';
import { ProfileSchema } from 'features/EditableProfileCard';
import { ArticleDetailsCommentsSchema } from 'features/ArticleDetailsComment';
import { rtkApi } from 'shared/api/rtkApi';
import { CartSchema } from 'entities/Cart';
import { EditorSchema } from 'features/Editor';
import { ProductFavoritesSchema } from 'features/ProductFavoriteButton';
import { ProductsPageSchema } from 'pages/ProductsPage';
import { SandboxSettingsSchema } from 'features/SandboxSettings';
import { ProductsFiltersSchema } from 'features/ProductsFilter';
import { MobileBarSchema } from 'features/MobileBar';
import { FavoriteSchema } from 'entities/Favorite';
import { CartProductSchema } from 'features/CartProduct';
import { ArticleDetailsRatingSchema } from 'features/ArticleDetailsRating';
import { SignUpByEmailSchema } from 'features/SignUpByEmail';
import { LoginByEmailSchema } from 'features/LoginByEmail';

export interface StateSchema {
    user: UserSchema;
    cart: CartSchema;
    favorite: FavoriteSchema;
    cartProducts: CartProductSchema;
    productFavorites: ProductFavoritesSchema;

    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    // Асинхронные редюсеры
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    articleDetailsRating?: ArticleDetailsRatingSchema;
    articlesPage?: ArticlesPageSchema;
    articleFilters?: ArticleFiltersSchema;
    productsPage?: ProductsPageSchema;
    productsFilters?: ProductsFiltersSchema;
    editor?: EditorSchema;
    sandboxSettings?: SandboxSettingsSchema;
    signUpByEmail?: SignUpByEmailSchema;
    loginByEmail?: LoginByEmailSchema;
    mobileBar?: MobileBarSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;

    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
