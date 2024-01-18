import { IconType } from 'react-icons';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { FaUser } from 'react-icons/fa6';
import { FaBook } from 'react-icons/fa';

export interface DashboardItemType {
  path:string;
  text:string;
  Icon:IconType;
}

export const DashboardList:DashboardItemType[] = [
    {
        path: RoutePath.profile,
        text: 'Profile',
        Icon: FaUser,
    },
    {
        path: RoutePath.articles,
        text: 'Articles',
        Icon: FaBook,
    },
];
