import { Article } from 'entities/Article';
import { Product } from 'entities/Product';
import { BreakpointsSlider } from 'shared/ui/Slider/Slider';

export enum CardBlocksTypes {
    ARTICLES = 'articles',
    PHONE = 'phone',
    PC = 'pc',
}
export type MainPageCardBlock = Article | Product;

export interface MainPageApiArg {
    limit: number;
    order: string;
    url: string;
    category?: string;
}

export const breakpointsMainPageCards: BreakpointsSlider = {
    320: {
        slidesPerView: 1.5,
    },
    525: {
        slidesPerView: 2.2,
    },
    768: {
        slidesPerView: 3.2,
    },
    1024: {
        slidesPerView: 4.2,
    },
    1370: {
        slidesPerView: 5.2,
    },
};
