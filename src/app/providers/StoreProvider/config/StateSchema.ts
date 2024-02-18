import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { AnyAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { AxiosInstance } from 'axios';
import { To } from 'history';
import { NavigateOptions } from 'react-router';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ArticleFiltersSchema } from 'features/ArticleFilters';
import { ProfileSchema } from 'features/EditableProfilleCard';
import { ArticleDetailsCommentsSchema } from 'features/ArticleDetailsComment';
import { rtkApi } from 'shared/api/rtkApi';
import { CartSchema } from 'entities/Cart';
import { SandboxPageSchema } from 'pages/SandboxPage';
import { EditorSchema } from 'features/Editor';
import { MenuBurgerSchema } from 'features/MenuBurgerButton';
import { ProductFavoritesSchema } from 'features/ProductFavoriteButton';
import { ProductsPageSchema } from 'pages/ProductsPage';
import { SandboxSettingsSchema } from 'features/SandboxSettings';

export interface StateSchema {
    user: UserSchema;
    cart: CartSchema;
    productFavorites: ProductFavoritesSchema;

    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    // Асинхронные редюсеры
    login?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    articlesPage?: ArticlesPageSchema;
    articleFilters?: ArticleFiltersSchema;
    productsPage?: ProductsPageSchema;
    sandboxPage?: SandboxPageSchema;
    editor?: EditorSchema;
    sandboxSettings?: SandboxSettingsSchema;

    menuBurger?: MenuBurgerSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
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
