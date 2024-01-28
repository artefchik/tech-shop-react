import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { StarRating } from 'shared/ui/StarRating/StarRating';
import { useCallback, useState } from 'react';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { Modal } from 'shared/ui/Modal/Modal';
import { Input } from 'shared/ui/Input/Input';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { BrowserView, MobileView } from 'react-device-detect';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import cls from './RatingCard.module.scss';

interface RatingCardProps {
    className?: string;
    title?:string;
    feedbackTitle?:string;
    onCancel?:(starsCount:number)=>void;
    onAccept?:(starsCount:number, feedback?:string)=>void;
    hasFeedback?:boolean;
    rate?:number
}

export const RatingCard = (props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        onCancel,
        onAccept,
        hasFeedback,
        rate = 0,
    } = props;

    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');
    const { isOpenModal, onShowModal, onCloseModal } = useToggleModal();

    const onSelectStars = useCallback((selectStarsCount:number) => {
        setStarsCount(selectStarsCount);
        if (hasFeedback) {
            onShowModal();
        } else {
            onAccept?.(selectStarsCount);
        }
    }, [hasFeedback, onAccept, onShowModal]);

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
            <Text title={feedbackTitle} align={TextAlign.CENTER} />
            <Input value={feedback} onChange={setFeedback} />
        </>
    );

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align="center" gap="15">
                <Text title={starsCount ? 'Спасибо за оценку !' : title} />
                <StarRating selectedStars={starsCount} onSelect={onSelectStars} />
            </VStack>
            <BrowserView>
                <Modal isOpen={isOpenModal} lazy onClose={onCancelHandler}>
                    <VStack gap="20">
                        <VStack gap="15">
                            {modelContent}
                        </VStack>
                        <HStack justify="end" gap="15">
                            <Button theme={ThemeButton.OUTLINE_RED} onClick={onCancelHandler}>close</Button>
                            <Button onClick={onAcceptHandler}>save</Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isOpenModal} onClose={onCancelHandler} lazy>
                    <VStack gap="20">
                        <VStack gap="15">
                            {modelContent}
                        </VStack>
                        <Button onClick={onAcceptHandler}>save</Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
};
