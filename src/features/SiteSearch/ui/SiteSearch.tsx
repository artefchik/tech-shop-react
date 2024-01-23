import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { siteSearchSliceActions, siteSearchSliceReducer } from '../model/slice/siteSearchSlice';
import { getSiteSearchText } from '../model/selectors/getSiteSearchText/getSiteSearchText';
import cls from './SiteSearch.module.scss';

interface SiteSearchProps {
  className?: string;
  onSend:()=>void
}

export const SiteSearch = ({ className, onSend }: SiteSearchProps) => {
    const dispatch = useAppDispatch();
    const text = useSelector(getSiteSearchText);
    const onChangeSearch = useCallback((value:string) => {
        dispatch(siteSearchSliceActions.setText(value));
        onSend();
    }, [dispatch, onSend]);
    return (
        <DynamicModelLoader name="siteSearch" reducer={siteSearchSliceReducer}>
            <Input value={text} onChange={onChangeSearch} className={classNames(cls.SiteSearch, {}, [className])} />
        </DynamicModelLoader>
    );
};
