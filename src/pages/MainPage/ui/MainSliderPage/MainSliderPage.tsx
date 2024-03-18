import { useCallback, useMemo } from 'react';
import img from 'shared/assets/img1.jpeg';
import img2 from 'shared/assets/img2.jpeg';
import img3 from 'shared/assets/img3.jpeg';
import { Slider } from 'shared/ui/Slider/Slider';
import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import { TextAlign, TextSize, TextTheme, Text } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { SwiperSlide } from 'swiper/react';
import cls from './MainSliderPage.module.scss';

interface MainSliderPageProps {
    className?: string;
}

export interface MainSliderItem {
    id: number;
    image: string;
    title: string;
    text?: string;
}

export const MainSliderPage = ({ className }: MainSliderPageProps) => {
    const { t, i18n } = useTranslation('main-page');

    const slides = useMemo<MainSliderItem[]>(
        () => [
            {
                id: 1,
                image: img,
                title: 'iPhone 15 Pro and 15 Pro Max',
                text: t(
                    'Пробудите в себе гения с новым iPhone ,  интеллект и стиль в каждой детали',
                ),
            },
            {
                id: 2,
                image: img2,
                title: 'iPhone 15 Pro and 15 Pro Max',
                text: 'Пробудите в себе гения с новым iPhone: интеллект и стиль в каждой детали',
            },
            {
                id: 3,
                image: img3,
                title: 'MacBook Air M2',
                text:
                    'Новый Мас Air в новом форм-факторе и с процессором\n' +
                    'Apple M2',
            },
        ],
        [t],
    );

    const slideItem = useCallback(
        (slide: MainSliderItem) => (
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
                        <Button>{t('Купить')}</Button>
                    </VStack>
                    <div className={cls.image}>
                        <img src={slide.image} alt={slide.title} />
                    </div>
                </VStack>
            </SwiperSlide>
        ),
        [t],
    );
    return <Slider className={cls.slider}>{slides.map(slideItem)}</Slider>;
};
