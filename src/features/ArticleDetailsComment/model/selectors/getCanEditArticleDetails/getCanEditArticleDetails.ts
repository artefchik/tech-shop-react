import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from 'entities/Article';
import { getUserAuthData } from 'entities/User';

export const getCanEditArticleDetails = createSelector(
    getArticleDetailsData,
    getUserAuthData,
    (data, user) => {
        if (!data || !user) return false;
        return data.user?._id === user?._id;
    },
);
