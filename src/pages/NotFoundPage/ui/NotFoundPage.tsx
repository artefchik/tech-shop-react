import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => (
    <Page className={classNames(cls.NotFoundPage, {}, [className])}>
        NotFoundPage
    </Page>
);
