import { Slider } from 'shared/ui/Slider/Slider';
import { SwiperSlide } from 'swiper/react';
import { ReactNode } from 'react';
import { Article } from 'entities/Article';
import { Product } from 'entities/Product';
import { breakpointsMainPageCards } from '../../model/types/cardBlocks';

interface MainPageCardsSliderProps<T extends Article | Product> {
    className?: string;
    data?: T[];
    children: (item: T) => ReactNode;
}

export function MainPageCardsSlider<T extends Article | Product>(
    props: MainPageCardsSliderProps<T>,
) {
    const { className, data, children } = props;
    return (
        <Slider
            className={className}
            breakpoints={breakpointsMainPageCards}
            spaceBetween={20}
            pagination={false}
        >
            {data &&
                data.map((item) => (
                    <SwiperSlide key={item.id}>{children(item)}</SwiperSlide>
                ))}
        </Slider>
    );
}
