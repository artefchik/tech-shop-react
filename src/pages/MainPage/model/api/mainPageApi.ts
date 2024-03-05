import { rtkApi } from 'shared/api/rtkApi';
import { Article } from 'entities/Article';

interface MainPageApiArg {
    limit: number;
    order: string;
    url: string;
}

interface MainPageApiResponse<T> {
    items: T;
}

const mainPageApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getMainBlockPage: build.query<Article[], MainPageApiArg>({
            query: ({ limit, url, order }) => ({
                url,
                params: {
                    limit,
                    order,
                },
            }),
        }),
    }),
});

export const useGetMainBlockPage = mainPageApi.useGetMainBlockPageQuery;
