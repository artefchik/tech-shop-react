import { ReactNode } from 'react';
import { EditableProfileCard } from 'features/EditableProfileCard';

export enum ProfilePageItemType {
    SETTING = 'settings',
    PROFILE = 'profile',
    FAVORITES = 'favorites',
}

export interface ProfileItem {
    content: string;
    block: ProfilePageItemType;
}
export interface ProfileIte {
    content: string;
    block: ReactNode;
}

export const profileItemsConfig: ProfileItem[] = [
    {
        content: 'Profile',
        block: ProfilePageItemType.PROFILE,
    },
    {
        content: 'Settings',
        block: ProfilePageItemType.SETTING,
    },
    {
        content: 'Favorites',
        block: ProfilePageItemType.FAVORITES,
    },
];
