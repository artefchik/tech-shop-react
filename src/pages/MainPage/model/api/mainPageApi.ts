import { rtkApi } from 'shared/api/rtkApi';
import { Article } from 'entities/Article';
import { Product } from 'entities/Product';
import { MainPageApiArg } from '../types/cardBlocks';

const mainPageApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getMainBlockPage: build.query<Product[], MainPageApiArg>({
            query: ({ limit, url, order, category }) => ({
                url,
                params: {
                    limit,
                    order,
                    category,
                },
            }),
        }),
    }),
});

export const useGetMainBlockPage = mainPageApi.useGetMainBlockPageQuery;
