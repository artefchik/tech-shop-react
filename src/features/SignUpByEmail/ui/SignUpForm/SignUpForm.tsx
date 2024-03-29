import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    signUpSchema,
    SignUpSchema,
} from 'features/SignUpByEmail/model/types/SignUpSchema';
import {
    Text,
    TextAlign,
    TextSize,
    TextTheme,
    TextWeight,
} from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import emailIcon from 'shared/assets/icons/email.svg';
import user from 'shared/assets/icons/user.svg';
import { PasswordInput } from 'shared/ui/Input/PasswordInput';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { signUpByEmailReducer } from 'features/SignUpByEmail/model/slice/signUpByEmailSlice';
import { ErrorBlock } from 'shared/ui/ErrorBlock/ErrorBlock';
import { useSelector } from 'react-redux';
import { getSignUpByEmailError } from '../../model/selectors/getSignUpByEmailError/getSignUpByEmailError';
import { signUpByEmail } from '../../model/services/signUpByEmail/signUpByEmail';

interface SignUpFormProps {
    onChangeForm?: () => void;
    onSuccess?: () => void;
    className?: string;
}

const reducers: ReducersList = {
    signUpByEmail: signUpByEmailReducer,
};

const SignUpForm = (props: SignUpFormProps) => {
    const { className, onChangeForm, onSuccess } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const error = useSelector(getSignUpByEmailError);
    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty, isSubmitting, errors },
    } = useForm<SignUpSchema>({
        mode: 'onBlur',
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSignClick: SubmitHandler<SignUpSchema> = useCallback(
        async (data: SignUpSchema) => {
            console.log(data);
            const result = await dispatch(
                signUpByEmail({
                    email: data.email,
                    password: data.password,
                    username: data.username,
                }),
            );

            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess?.();
                reset();
            }
        },
        [dispatch, onSuccess, reset],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="20" className={className}>
                <Text
                    size={TextSize.LARGE}
                    align={TextAlign.CENTER}
                    text={t('Sign Up')}
                    weight={TextWeight.SEMI}
                    As="h4"
                />
                <form onSubmit={handleSubmit(onSignClick)}>
                    <VStack gap="20">
                        <VStack gap="5">
                            <Controller
                                name="username"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        icon={user}
                                        placeholder={t('Username')}
                                        isError={Boolean(
                                            errors.username?.message,
                                        )}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.username && (
                                <Text
                                    text={errors.username?.message}
                                    theme={TextTheme.ERROR}
                                />
                            )}
                        </VStack>
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
                                <Text
                                    text={errors.email?.message}
                                    theme={TextTheme.ERROR}
                                />
                            )}
                        </VStack>
                        <VStack gap="5">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <PasswordInput
                                        placeholder={t('Password')}
                                        isError={Boolean(
                                            errors.password?.message,
                                        )}
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
                        <VStack gap="5">
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <PasswordInput
                                        placeholder={t('Confirm Password')}
                                        isError={Boolean(
                                            errors.confirmPassword?.message,
                                        )}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.confirmPassword && (
                                <Text
                                    text={errors.confirmPassword?.message}
                                    theme={TextTheme.ERROR}
                                />
                            )}
                        </VStack>
                        {error && <ErrorBlock text={error} />}
                        <Button
                            disabled={!isDirty || isSubmitting}
                            type="submit"
                        >
                            {t('Submit')}
                        </Button>
                    </VStack>
                </form>
                <HStack justify="center" gap="5">
                    <Text text={t('Have an account?')} />
                    <Text
                        theme={TextTheme.LINKCOLOR}
                        As="span"
                        text={t('Login')}
                        onClick={onChangeForm}
                    />
                </HStack>
            </VStack>
        </DynamicModuleLoader>
    );
};
export default SignUpForm;
