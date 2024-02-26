import { rtkApi } from 'shared/api/rtkApi';
import { Article } from 'entities/Article';

interface MainPageApiArg {
    limit: number;
    url: string;
}

interface MainPageApiResponse<T> {
    items: T;
}

const mainPageApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getMainBlockPage: build.query<Article[], MainPageApiArg>({
            query: ({ limit, url }) => ({
                url,
                params: {
                    limit,
                },
            }),
        }),
    }),
});

export const useGetMainBlockPage = mainPageApi.useGetMainBlockPageQuery;
