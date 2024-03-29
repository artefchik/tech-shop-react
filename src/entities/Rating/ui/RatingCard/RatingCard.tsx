import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { StarRating } from 'shared/ui/StarRating/StarRating';
import { useCallback, useState } from 'react';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { Modal } from 'shared/ui/Modal/Modal';
import { Input } from 'shared/ui/Input/Input';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { DrawerContent } from 'shared/ui/Drawer/Drawer';
import { useTranslation } from 'react-i18next';
import cls from './RatingCard.module.scss';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    hasFeedback?: boolean;
    rate: number;
}

export const RatingCard = (props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        onCancel,
        onAccept,
        hasFeedback,
        rate,
    } = props;

    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');
    const { isOpenModal, onShowModal, onCloseModal } = useToggleModal();
    const { t } = useTranslation();
    const onSelectStars = useCallback(
        (selectStarsCount: number) => {
            setStarsCount(selectStarsCount);
            if (hasFeedback) {
                onShowModal();
            } else {
                onAccept?.(selectStarsCount);
            }
        },
        [hasFeedback, onAccept, onShowModal],
    );

    const onCancelHandler = useCallback(() => {
        onCloseModal();
        onCancel?.(starsCount);
    }, [onCancel, onCloseModal, starsCount]);

    const onAcceptHandler = useCallback(() => {
        onCloseModal();
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, onCloseModal, starsCount]);

    const modelContent = (
        <>
            <Text text={feedbackTitle} align={TextAlign.CENTER} />
            <Input value={feedback} onChange={setFeedback} />
        </>
    );

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align="center" gap="15">
                <Text
                    size={TextSize.BIG}
                    text={
                        starsCount
                            ? t('Thank you for evaluating the article')
                            : title
                    }
                />
                <StarRating
                    selectedStars={starsCount}
                    onSelect={onSelectStars}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isOpenModal} lazy onClose={onCancelHandler}>
                    <VStack gap="20">
                        <VStack gap="15">{modelContent}</VStack>
                        <HStack justify="end" gap="15">
                            <Button
                                theme={ThemeButton.OUTLINE_RED}
                                onClick={onCancelHandler}
                            >
                                {t('Close')}
                            </Button>
                            <Button onClick={onAcceptHandler}>
                                {t('Submit')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <DrawerContent
                    isOpen={isOpenModal}
                    onClose={onCancelHandler}
                    lazy
                >
                    <VStack gap="20">
                        <VStack gap="15">{modelContent}</VStack>
                        <Button onClick={onAcceptHandler}>save</Button>
                    </VStack>
                </DrawerContent>
            </MobileView>
        </Card>
    );
};
