import { ReactNode } from 'react';
import { SortOrder } from 'shared/const/types';

export interface SortOrderOption {
    value: SortOrder;
    content: ReactNode;
}

export const sortOrderOptions: SortOrderOption[] = [
    {
        value: SortOrder.ASK,
        content: 'по возрастанию',
    },
    {
        value: SortOrder.DESK,
        content: 'по убыванию',
    },
];
