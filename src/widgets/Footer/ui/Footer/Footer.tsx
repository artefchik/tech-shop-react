import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Container } from 'shared/ui/Container/Container';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { Card } from 'shared/ui/Card/Card';
import { FooterTop } from 'widgets/Footer/ui/FooterTop/FooterTop';
import { FooterBottom } from 'widgets/Footer/ui/FooterBottom/FooterBottom';
import cls from './Footer.module.scss';

interface FooterProps {
    className?: string;
}

export const Footer = (props: FooterProps) => {
    const { className } = props;
    return (
        <footer className={classNames(cls.Footer, {}, [className])}>
            <Container>
                <FooterTop className={cls.top} />
                <FooterBottom />
            </Container>
        </footer>
    );
};
