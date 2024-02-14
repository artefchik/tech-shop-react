// import { classNames } from 'shared/lib/classNames/classNames';
// import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
// import { useCallback, useMemo } from 'react';
// import { ArticleType } from 'entities/Article';
// import { useSelector } from 'react-redux';
// import {
//     getArticleFiltersType,
// } from 'features/ArticleFilters/ui/selectors/getArticleFiltersType/getArticleFiltersType';
// import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
// import { articleFiltersActions } from 'features/ArticleFilters/ui/slice/articleFiltersSlice';
//
// interface ArticleTypeTabsProps {
//     className?: string;
//     fetchData:()=>void
// }
//
// export const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
//     const { className, fetchData } = props;
//     const type = useSelector(getArticleFiltersType);
//     const dispatch = useAppDispatch();
//
//     const onTabClick = useCallback((tab:TabItem) => {
//         dispatch(articleFiltersActions.setType(tab.value as ArticleType));
//         fetchData();
//     }, [dispatch, fetchData]);
//
//     const typeTabs = useMemo<TabItem[]>(
//         () => [
//             {
//                 value: ArticleType.ALL,
//                 content: 'Все статьи',
//             },
//             {
//                 value: ArticleType.SCIENCE,
//                 content: 'Наука',
//             },
//             {
//                 value: ArticleType.IT,
//                 content: 'IT',
//             },
//             {
//                 value: ArticleType.POLITICS,
//                 content: 'Политика',
//             },
//         ],
//         [],
//     );
//
//     return (
//         <Tabs tabs={typeTabs} value={type} onTabClick={onTabClick} />
//     );
// };
