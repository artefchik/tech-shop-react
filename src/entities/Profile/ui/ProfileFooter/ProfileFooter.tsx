import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions, updateProfileData } from 'entities/Profile';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import cls from './ProfileFooter.module.scss';

interface ProfileHeaderProps {
    className?: string;
}

export const ProfileFooter = ({ className }: ProfileHeaderProps) => {
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
        <div className={classNames(cls.ProfileFooter, {}, [className])}>
            {
                readonly ? <Button onClick={onEdit}>Редактировать</Button>
                    : (
                        <div className={cls.buttons}>
                            <Button onClick={onCancelEdit}>отменить </Button>
                            <Button onClick={onSave}>сохранить </Button>
                        </div>
                    )
            }
        </div>
    );
};
