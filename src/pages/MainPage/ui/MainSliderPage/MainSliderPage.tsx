import { useMemo } from 'react';
import img from 'shared/assets/img1.jpeg';
import img2 from 'shared/assets/img2.jpeg';
import img3 from 'shared/assets/img3.jpeg';
import { Slider } from 'shared/ui/Slider/Slider';

interface MainSliderPageProps {
    className?: string;
}

export const MainSliderPage = ({ className }: MainSliderPageProps) => {
    const slides = useMemo(
        () => [
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
                text:
                    'Новый Мас Air в новом форм-факторе и с процессором\n' +
                    'Apple M2',
            },
        ],
        [],
    );
    return <Slider className={className} slides={slides} />;
};
