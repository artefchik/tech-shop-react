import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import './SliderBullets.scss';
import 'swiper/scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';

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
    loop?: boolean;
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
        loop = false,
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
                loop={loop}
                speed={800}
                breakpoints={breakpoints}
            >
                {children}
            </Swiper>
        </div>
    );
}
