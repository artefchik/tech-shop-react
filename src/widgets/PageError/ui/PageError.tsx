import { classNames } from 'shared/lib/classNames/classNames';
import { Container } from 'shared/ui/Container/Container';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { VStack } from 'shared/ui/Stack';
import { useCallback } from 'react';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError = (props: PageErrorProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const onRefreshClick = useCallback(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    }, []);
    return (
        <Container className={classNames(cls.PageError, {}, [className])}>
            <VStack>
                <Text
                    text={t(
                        'An unexpected error has occurred, please refresh the page',
                    )}
                    size={TextSize.BIG}
                />
                <Button onClick={onRefreshClick}>
                    {t('Refresh the page')}
                </Button>
            </VStack>
        </Container>
    );
};
