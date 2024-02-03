import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from 'shared/ui/Stack';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';

import { profileActions } from '../../model/slice/profileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';

interface ProfileHeaderProps {
    className?: string;
}

export const EditableProfileFooter = memo(
    ({ className }: ProfileHeaderProps) => {
        const readonly = useSelector(getProfileReadonly);
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
                    <Button onClick={onEdit}>Редактировать</Button>
                ) : (
                    <HStack justify="between">
                        <Button onClick={onCancelEdit}>отменить </Button>
                        <Button onClick={onSave}>сохранить </Button>
                    </HStack>
                )}
            </div>
        );
    },
);
