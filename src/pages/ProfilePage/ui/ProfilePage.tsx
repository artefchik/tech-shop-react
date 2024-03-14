import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { Container } from 'shared/ui/Container/Container';
import { Page } from 'shared/ui/Page/Page';
import { Text } from 'shared/ui/Text/Text';
import { EditableProfileCard } from 'features/EditableProfileCard';
import { useTranslation } from 'react-i18next';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

export const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    if (!id) {
        return <Text text={t('User not found')} />;
    }
    return (
        <Page className={classNames(cls.ProfilePage, {}, [className])}>
            <Container>
                <EditableProfileCard id={id} />
            </Container>
        </Page>
    );
};
export default ProfilePage;
