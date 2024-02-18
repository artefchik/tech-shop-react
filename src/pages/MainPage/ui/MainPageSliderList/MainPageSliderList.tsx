import img from 'shared/assets/img1.jpeg';
import img2 from 'shared/assets/img2.jpeg';
import img3 from 'shared/assets/img3.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { VStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import cls from './MainPageSliderList.module.scss';

interface SliderItem {
    id: number;
    image?: string;
    title: string;
    text?: string;
}

interface MainPageSliderListProps {
    className?: string;
}

const slides: SliderItem[] = [
    {
        id: 1,
        image: img,
        title: 'iPhone 15 Pro u 15 Pro Max',
        text: 'Пробудите в себе гения с новым iPhone: интеллект и стиль в каждой детали',
    },
    {
        id: 2,
        image: img2,
        title: 'iPhone 15 Pro u 15 Pro Max',
        text: 'Пробудите в себе гения с новым iPhone: интеллект и стиль в каждой детали',
    },
    {
        id: 3,
        image: img3,
        title: 'MacBook Air с процессором M2',
        text: 'Новый Мас Air в новом форм-факторе и с процессором\n' + 'Apple M2',
    },
];

export const MainPageSliderList = ({ className }: MainPageSliderListProps) => (
    <>
        {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
                <VStack className={cls.slide}>
                    <VStack align="center" className={cls.content} gap="10">
                        <Text align={TextAlign.CENTER} text={slide.title} />
                        <Text text={slide.text} />

                        <Button>Купить</Button>
                    </VStack>
                    <div className={cls.image}>
                        <img src={slide.image} alt="" />
                    </div>
                </VStack>
            </SwiperSlide>
        ))}
        s
    </>
);
