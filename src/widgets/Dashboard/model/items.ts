import { RoutePath } from 'shared/const/router';

export interface DashboardItemType {
    path: string;
    text: string;
}

export const DashboardList: DashboardItemType[] = [
    {
        path: RoutePath.profile,
        text: 'Profile',
    },
    {
        path: RoutePath.articles,
        text: 'Publications',
    },
];
