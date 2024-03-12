import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { AboutPageBlock } from 'pages/AboutPage/ui/AboutPageBlock/AboutPageBlock';
import { AboutPageItem } from 'pages/AboutPage/model/types/about';
import favorite from 'shared/assets/icons/favorites.svg';
import star from 'shared/assets/icons/star.svg';
import delivery from 'shared/assets/icons/delivery.svg';
import image1 from 'shared/assets/aboutPage/image-block-1.jpg';
import image3 from 'shared/assets/aboutPage/image-block-3.png';
import image4 from 'shared/assets/aboutPage/image-block-4.png';
import cls from './AboutPage.module.scss';

interface AboutPageProps {
    className?: string;
}

const items: AboutPageItem[] = [
    {
        icon: favorite,
        title: 'A Family That Keeps On Growing',
        paragraphs: [
            'We always aim to please the home market, supplying great computers and hardware at great prices to non-corporate customers, through our large Melbourne CBD showroom and our online store.',
            'Shop management approach fosters a strong customer service focus in our staff. We prefer to cultivate long-term client relationships rather than achieve quick sales, demonstrated in the measure of our long-term success.',
        ],
        image: image1,
    },
    {
        icon: star,
        title: 'shop.com',
        paragraphs: [
            'Shop is a proudly Australian owned, Melbourne based supplier of I.T. goods and services, operating since 1991. Our client base encompasses individuals, small business, corporate and government organisations. We provide complete business IT solutions, centred on high quality hardware and exceptional customer service.',
        ],
        image: image3,
        isReverse: true,
    },
    {
        icon: delivery,
        title: 'Delivery to All Regions',
        paragraphs: [
            'We deliver our products all over the country. No matter where you live, your order will be shipped on time and delivered directly to your door or to any other location you specify. Packages are handled with extreme care, so the ordered products will be delivered to you safely, exactly as you expect them to be.',
        ],
        image: image4,
    },
];

const AboutPage = ({ className }: AboutPageProps) => {
    const { t } = useTranslation();
    return (
        <Page className={classNames(cls.AboutPage, {}, [className])}>
            <Container>
                <Text
                    text={t('About Us')}
                    size={TextSize.LARGE}
                    As="h2"
                    weight={TextWeight.SEMI}
                    className={cls.title}
                />
            </Container>
            {items.map((item) => (
                <AboutPageBlock key={item.image} block={item} />
            ))}
        </Page>
    );
};
export default AboutPage;
