import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleView } from 'entities/Article';
import { PiList } from 'react-icons/pi';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { memo, useCallback } from 'react';
import { BsGrid } from 'react-icons/bs';
import { HStack } from 'shared/ui/Stack';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view?:ArticleView
    onViewClick?:(view:ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        Icon: BsGrid,
    },
    {
        view: ArticleView.BIG,
        Icon: PiList,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, onViewClick, view = ArticleView.SMALL } = props;

    const onClick = useCallback((view:ArticleView) => () => {
        onViewClick?.(view);
    }, [onViewClick]);

    return (
        <HStack align="center" className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    key={viewType.view}
                    theme={ThemeButton.CLEAR}
                    onClick={onClick(viewType.view)}
                    className={classNames(cls.button, { [cls.selected]: viewType.view === view }, [className])}
                >
                    <viewType.Icon className={cls.icon} />
                </Button>
            ))}
        </HStack>
    );
});
