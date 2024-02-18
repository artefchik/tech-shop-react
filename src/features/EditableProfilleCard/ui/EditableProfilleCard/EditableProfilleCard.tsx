import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { memo, useCallback, useEffect } from 'react';
import { Card } from 'shared/ui/Card/Card';
import { EditableProfileFooter, ProfileCard, ProfileEdit } from 'entities/Profile';
import { HStack, VStack } from 'shared/ui/Stack';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';

interface EditableProfileCardProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfilleCard = memo(
    ({ className, id }: EditableProfileCardProps) => {
        const dispatch = useAppDispatch();
        const dataForm = useSelector(getProfileForm);
        const isLoading = useSelector(getProfileIsLoading);
        const readonly = useSelector(getProfileReadonly);
        const authData = useSelector(getUserAuthData);
        const canEdit = authData?.id === dataForm?.id;
        useEffect(() => {
            if (id) {
                dispatch(fetchProfileData(id));
            }
        }, [dispatch, id]);

        const onChangeFirstname = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ firstname: value || '' }));
            },
            [dispatch],
        );

        const onChangeLastname = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ lastname: value || '' }));
            },
            [dispatch],
        );

        return (
            <DynamicModuleLoader reducers={reducers}>
                <VStack gap="25">
                    <HStack gap="10">
                        <Text theme={TextTheme.HEADER} title="Профиль пользователя" />
                        <Text
                            theme={TextTheme.TEXT}
                            title={`${dataForm?.firstname} ${dataForm?.lastname}`}
                        />
                    </HStack>
                    <VStack gap="20">
                        <ProfileCard data={dataForm} />
                        <VStack gap="15">
                            <Text title="Настройки профиля" theme={TextTheme.SECONDARY} />
                            <Card>
                                <VStack gap="20">
                                    <ProfileEdit
                                        readonly={readonly}
                                        data={dataForm}
                                        onChangeFirstname={onChangeFirstname}
                                        onChangeLastname={onChangeLastname}
                                    />
                                    {canEdit && <EditableProfileFooter />}
                                </VStack>
                            </Card>
                        </VStack>
                    </VStack>
                </VStack>
            </DynamicModuleLoader>
        );
    },
);
