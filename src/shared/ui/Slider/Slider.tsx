import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import './SliderBullets.scss';
import 'swiper/scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
// [width: number]: SwiperOptions;

export interface BreakpointsSlider {
    [width: number]: {
        spaceBetween?: number;
        slidesPerView?: number;
    };
}
interface SliderProps {
    className?: string;
    children: ReactNode;
    slidesPerView?: number;
    pagination?: boolean;
    spaceBetween?: number;
    breakpoints?: BreakpointsSlider;
}

export function Slider(props: SliderProps) {
    const {
        className,
        children,
        spaceBetween = 50,
        pagination = true,
        breakpoints,
        slidesPerView = 1,
    } = props;

    return (
        <div className={className}>
            <Swiper
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                modules={[Pagination, Autoplay]}
                pagination={
                    pagination && {
                        dynamicBullets: true,
                        clickable: true,
                    }
                }
                autoplay={{
                    delay: 2400,
                    disableOnInteraction: false,
                }}
                loop
                speed={800}
                breakpoints={breakpoints}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper: any) => console.log(swiper)}
            >
                {children}
            </Swiper>
        </div>
    );
}
