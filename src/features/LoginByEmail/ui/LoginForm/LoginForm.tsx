import { Input } from 'shared/ui/Input/Input';
import { memo, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { Text, TextAlign, TextSize, TextTheme, TextWeight } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import emailIcon from 'shared/assets/icons/email.svg';
import { PasswordInput } from 'shared/ui/Input/PasswordInput';
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail';
import { LoginSchema, loginSchema } from '../../model/types/LoginSchema';

interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
    onChangeForm?: () => void;
}

const LoginForm = memo((props: LoginFormProps) => {
    const { className, onSuccess, onChangeForm } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onLoginClick: SubmitHandler<LoginSchema> = useCallback(
        async (data) => {
            console.log(data);
            const result = await dispatch(
                loginByEmail({
                    email: data.email,
                    password: data.password,
                }),
            );

            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess?.();
            }
        },
        [dispatch, onSuccess],
    );

    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty, isSubmitting, errors },
    } = useForm<LoginSchema>({
        mode: 'onBlur',
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    return (
        <VStack gap="20" className={className}>
            <Text
                size={TextSize.LARGE}
                text={t('Login')}
                align={TextAlign.CENTER}
                weight={TextWeight.SEMI}
                As="h4"
            />
            <form onSubmit={handleSubmit(onLoginClick)}>
                <VStack gap="20">
                    <VStack gap="5">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    icon={emailIcon}
                                    placeholder={t('Email')}
                                    isError={Boolean(errors.email?.message)}
                                    {...field}
                                />
                            )}
                        />
                        {errors.email && (
                            <Text text={errors.email?.message} theme={TextTheme.ERROR} />
                        )}
                    </VStack>
                    <VStack gap="5">
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <PasswordInput
                                    placeholder={t('Password')}
                                    isError={Boolean(errors.password?.message)}
                                    {...field}
                                />
                            )}
                        />
                        {errors.password && (
                            <Text
                                text={errors.password?.message}
                                theme={TextTheme.ERROR}
                            />
                        )}
                    </VStack>
                    <Button
                        isLoading={isSubmitting}
                        disabled={!isDirty || isSubmitting}
                        type="submit"
                    >
                        {t('Submit')}
                    </Button>
                </VStack>
            </form>
            <HStack justify="center" gap="5">
                <Text text={t("Don't have an account?")} />
                <Text
                    theme={TextTheme.LINKCOLOR}
                    As="span"
                    text={t('Sign Up')}
                    onClick={onChangeForm}
                />
            </HStack>
        </VStack>
    );
});

export default LoginForm;
