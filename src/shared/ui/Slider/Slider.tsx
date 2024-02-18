import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import cls from './Slider.module.scss';
import './SliderBullets.scss';
import 'swiper/scss';
import { VStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';

interface SliderItem {
    id: number;
    image?: string;
    title: string;
    text?: string;
}

interface SliderProps {
    className?: string;
    slides: SliderItem[];
}

export const Slider = (props: SliderProps) => {
    const { className, slides } = props;
    return (
        <div className={classNames(cls.Slider, {}, [className])}>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                modules={[Pagination, Autoplay]}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                autoplay={{
                    delay: 2400,
                    disableOnInteraction: false,
                }}
                loop
                speed={800}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper: any) => console.log(swiper)}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <VStack className={cls.slide}>
                            <VStack align="center" className={cls.content} gap="10">
                                <VStack gap="5" align="center">
                                    <Text
                                        align={TextAlign.CENTER}
                                        theme={TextTheme.DEFAULT}
                                        size={TextSize.LARGE}
                                        text={slide.title}
                                        As="h2"
                                    />
                                    <Text
                                        align={TextAlign.CENTER}
                                        theme={TextTheme.DEFAULT}
                                        text={slide.text}
                                    />
                                </VStack>
                                <Button>Купить</Button>
                            </VStack>
                            <div className={cls.image}>
                                <img src={slide.image} alt="" />
                            </div>
                        </VStack>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
