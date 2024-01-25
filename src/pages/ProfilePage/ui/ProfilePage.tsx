import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { Container } from 'shared/ui/Container/Container';
import { Page } from 'shared/ui/Page/Page';
import { Text } from 'shared/ui/Text/Text';
import { EditableProfilleCard } from 'features/EditableProfilleCard';
import { Dashboard } from 'widgets/Dashboard';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

export const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const { id } = useParams<{id:string}>();

    if (!id) {
        return <Text title="no" />;
    }

    return (
        <Page className={classNames(cls.ProfilePage, {}, [className])}>
            <Container className={cls.container}>
                <Dashboard className={cls.dashboard} />
                <EditableProfilleCard id={id} />
            </Container>
        </Page>
    );
};
export default ProfilePage;
