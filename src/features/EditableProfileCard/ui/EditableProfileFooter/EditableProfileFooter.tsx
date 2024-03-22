import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { updateProfileAvatar } from 'features/EditableProfileCard/model/services/updateProfileAvatar/updateProfileAvatar';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

import { profileActions } from '../../model/slice/profileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';

interface ProfileHeaderProps {
    className?: string;
}

export const EditableProfileFooter = memo(
    ({ className }: ProfileHeaderProps) => {
        const readonly = useSelector(getProfileReadonly);
        const { t } = useTranslation();
        const dispatch = useAppDispatch();

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <div className={classNames('', {}, [className])}>
                {readonly ? (
                    <Button onClick={onEdit}>{t('Edit')}</Button>
                ) : (
                    <HStack justify="between">
                        <Button onClick={onCancelEdit}>{t('Cancel')} </Button>
                        <Button onClick={onSave}>{t('Save')} </Button>
                    </HStack>
                )}
            </div>
        );
    },
);
