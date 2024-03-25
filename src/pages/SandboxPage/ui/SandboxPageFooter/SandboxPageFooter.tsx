import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { HStack } from 'shared/ui/Stack';
import { useCallback } from 'react';
import { getEditorValidate } from 'features/Editor/model/selectors/getEditorValidate/getEditorValidate';
import { getEditorTextBlocksParagraphs } from 'features/Editor/model/selectors/getEditorBlocks/getEditorBlocks';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { sendArticleForModeration } from 'pages/SandboxPage/model/services/sendArticleForModeration/sendArticleForModeration';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { sandboxSettingsReducer } from 'features/SandboxSettings';
import { getSandboxSettingsImage } from 'features/SandboxSettings/model/selectors/getSandboxSettingsImage/getSandboxSettingsImage';
import { getSandboxPageIsLoading } from 'pages/SandboxPage/model/selectors/getSandboxPageIsLoading/getSandboxPageIsLoading';
import { editorActions } from 'features/Editor/model/slice/editorSlice';
import { sandboxSettingsActions } from 'features/SandboxSettings/model/slice/sandboxSettingsSlice';
import cls from './SandboxPageFooter.module.scss';

interface SandboxPageFooterProps {
    className?: string;
    activeStep: number;
    stepsCount: number;
    onChangeStep: (step: number) => void;
}

const reducers: ReducersList = {
    sandboxSettings: sandboxSettingsReducer,
};

export const SandboxPageFooter = (props: SandboxPageFooterProps) => {
    const { className, activeStep, onChangeStep, stepsCount } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isValidateEditorFields = useSelector(getEditorValidate);
    const text = useSelector(getEditorTextBlocksParagraphs);
    const prevImage = useSelector(getSandboxSettingsImage);

    const isLoading = useSelector(getSandboxPageIsLoading);
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

    // const onSubmit = () => {
    //     dispatch(sendArticleForModeration());
    // };

    const onSubmit = useCallback(async () => {
        const result = await dispatch(sendArticleForModeration());
        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(editorActions.resetEditor());
            dispatch(sandboxSettingsActions.resetSettings());
        }
    }, [dispatch]);

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
                    <Button
                        onClick={onSubmit}
                        disabled={!prevImage || isLoading}
                        isLoading={isLoading}
                    >
                        {t('Submit for moderation')}
                    </Button>
                </HStack>
            )}
        </div>
    );
};
