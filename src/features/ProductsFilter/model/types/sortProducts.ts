import { SortOrder } from 'shared/const/types';
import { SortOrderOption } from 'shared/const/order';
import i18n from 'i18next';
import 'shared/config/i18n/i18n';

export const sortProducts: SortOrderOption[] = [
    {
        value: SortOrder.ASC,
        content: i18n.t('ascending  price'),
    },
    {
        value: SortOrder.DESC,
        content: i18n.t('descending  price'),
    },
];
