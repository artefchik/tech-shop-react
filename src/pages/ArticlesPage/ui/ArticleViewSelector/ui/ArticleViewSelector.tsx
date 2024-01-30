import { memo, useCallback } from 'react';
import { ViewSelector, ViewType } from 'shared/ui/ViewSelector/ViewSelector';
import { useSelector } from 'react-redux';
import { getArticleListView } from 'pages/ArticlesPage/model/selectors/getArticleListView/getArticleListView';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/articlesPageSlice';

interface ArticleViewSelectorProps {
    className?: string;
}

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className } = props;

    const view = useSelector(getArticleListView);
    const dispatch = useAppDispatch();

    const onChangeView = useCallback(
        (view: ViewType) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch],
    );

    return (
        <ViewSelector
            view={view}
            onViewClick={onChangeView}
            className={className}
        />
    );
});
