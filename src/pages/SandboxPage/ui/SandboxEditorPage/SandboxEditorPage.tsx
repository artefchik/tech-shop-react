import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getRoutePathProfile } from 'shared/const/router';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { Editor } from 'features/Editor';
import cls from './SandboxEditorPage.module.scss';

interface SandboxEditorPageProps {
    className?: string;
}

export const SandboxEditorPage = (props: SandboxEditorPageProps) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);

    return (
        <Card className={classNames(cls.SandboxEditorPage, {}, [className])}>
            <AppLink
                to={getRoutePathProfile(authData?.id || '')}
                theme={AppLinkTheme.CLEAR}
                className={cls.info}
            >
                <Avatar src={authData?.avatar} alt={authData?.username} />
                <Text text={authData?.username} theme={TextTheme.USER} />
            </AppLink>
            <VStack>
                <Editor />
            </VStack>
        </Card>
    );
};
