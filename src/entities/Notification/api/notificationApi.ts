import { rtkApi } from 'shared/api/rtkApi';
import { NotificationType } from '../model/types/notifcation';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<NotificationType[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
});
export const useNotifications = notificationApi.useGetNotificationsQuery;
