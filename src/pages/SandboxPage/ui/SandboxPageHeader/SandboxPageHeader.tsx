import { useTranslation } from 'react-i18next';
import { Text, TextSize } from 'shared/ui/Text/Text';

interface SandboxPageHeaderProps {
    className?: string;
    activeStep: number;
    steps: string[];
}

export const SandboxPageHeader = (props: SandboxPageHeaderProps) => {
    const { className, activeStep, steps } = props;
    const { t } = useTranslation();
    return (
        <div className={className}>
            {steps.map(
                (step, index) =>
                    index === activeStep && (
                        <Text
                            text={step}
                            key={index}
                            size={TextSize.LARGE}
                            As="h3"
                        />
                    ),
            )}
        </div>
    );
};
