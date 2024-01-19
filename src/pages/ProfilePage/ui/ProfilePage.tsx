import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect } from 'react';
import {
    fetchProfileData,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    ProfileFooter,
    profileReducer,
} from 'entities/Profile';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useSelector } from 'react-redux';
import { Container } from 'shared/ui/Container/Container';
import { Card } from 'shared/ui/Card/Card';
import { Dashboard } from 'widgets/Dashboard/ui/Dashboard/Dashboard';
import { getUserAuthData } from 'entities/User';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

export const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const { id } = useParams<{id:string}>();
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
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                <Container className={cls.container}>
                    <Dashboard className={cls.dashboard} />
                    <Card className={cls.body}>
                        <ProfileCard
                            readonly={readonly}
                            data={dataForm}
                            onChangeFirstname={onChangeFirstname}
                            onChangeLastname={onChangeLastname}
                        />
                        {canEdit && <ProfileFooter />}
                    </Card>
                </Container>
            </div>
        </DynamicModelLoader>
    );
};
export default ProfilePage;
