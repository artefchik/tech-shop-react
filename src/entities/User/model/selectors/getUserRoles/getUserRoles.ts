import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { UserRoles } from 'entities/User';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const getIsAdminRole = createSelector(getUserRoles, (roles) =>
    roles?.includes(UserRoles.ADMIN),
);
