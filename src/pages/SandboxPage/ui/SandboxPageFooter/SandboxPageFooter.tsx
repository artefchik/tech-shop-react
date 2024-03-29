import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { HStack } from 'shared/ui/Stack';
import { useCallback } from 'react';
import { getEditorValidate } from 'features/Editor/model/selectors/getEditorValidate/getEditorValidate';
import {
    getEditorTextBlocks,
    getEditorTextBlocksParagraphs,
} from 'features/Editor/model/selectors/getEditorBlocks/getEditorBlocks';
import cls from './SandboxPageFooter.module.scss';

interface SandboxPageFooterProps {
    className?: string;
    activeStep: number;
    stepsCount: number;
    onChangeStep: (step: number) => void;
}

export const SandboxPageFooter = (props: SandboxPageFooterProps) => {
    const { className, activeStep, onChangeStep, stepsCount } = props;
    const { t } = useTranslation();

    const isValidateEditorFields = useSelector(getEditorValidate);
    const text = useSelector(getEditorTextBlocksParagraphs);
    console.log('text', text);
    const onClickNext = useCallback(
        (step: number) => () => {
            if (activeStep !== stepsCount) {
                onChangeStep(step + 1);
            }
        },
        [activeStep, onChangeStep, stepsCount],
    );

    const onClickBack = useCallback(
        (step: number) => () => {
            onChangeStep(step - 1);
        },
        [onChangeStep],
    );
    return (
        <div className={classNames(cls.SandboxPageFooter, {}, [className])}>
            {activeStep === 0 && (
                <Button
                    disabled={!isValidateEditorFields}
                    onClick={onClickNext(activeStep)}
                >
                    {t('Go to Settings')}
                </Button>
            )}
            {activeStep === 1 && (
                <HStack gap="20">
                    <Button onClick={onClickBack(activeStep)}>
                        {t('Go to back')}
                    </Button>
                    <Button>{t('Submit for moderation')}</Button>
                </HStack>
            )}
        </div>
    );
};
