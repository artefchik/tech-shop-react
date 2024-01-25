import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { memo, useCallback, useEffect } from 'react';
import { Card } from 'shared/ui/Card/Card';
import { ProfileCard, EditableProfileFooter } from 'entities/Profile';
import { VStack } from 'shared/ui/Stack';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import {
    getProfileReadonly,
} from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import {
    getProfileIsLoading,
} from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';

interface EditableProfilleCardProps {
  className?: string;
  id:string
}

export const EditableProfilleCard = memo(({ className, id }: EditableProfilleCardProps) => {
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

    const onChangeFirstname = useCallback((value?:string) => {
        dispatch(profileActions.updateProfile({ firstname: value || '' }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value?:string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }));
    }, [dispatch]);

    return (
        <DynamicModelLoader name="profile" reducer={profileReducer}>
            <Card>
                <VStack gap="20">
                    <ProfileCard
                        readonly={readonly}
                        data={dataForm}
                        onChangeFirstname={onChangeFirstname}
                        onChangeLastname={onChangeLastname}
                    />
                    {canEdit && <EditableProfileFooter />}
                </VStack>

            </Card>
        </DynamicModelLoader>

    );
});
