import { classNames } from 'shared/lib/classNames/classNames';
import { Container } from 'shared/ui/Container/Container';
import { Suspense } from 'react';
import { FooterTop } from '../FooterTop/FooterTop';
import { FooterBottom } from '../FooterBottom/FooterBottom';
import cls from './Footer.module.scss';

interface FooterProps {
    className?: string;
}

export const Footer = (props: FooterProps) => {
    const { className } = props;
    return (
        <footer className={classNames(cls.Footer, {}, [className])}>
            <Container>
                <Suspense fallback="">
                    <FooterTop className={cls.top} />
                </Suspense>
                <FooterBottom />
            </Container>
        </footer>
    );
};
