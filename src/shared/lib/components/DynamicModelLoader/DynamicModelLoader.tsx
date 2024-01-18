import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';

// export types ReducerList = {
//     [name in StateSchemaKey]?:Reducer
// }

// types ReducerListEntry = [StateSchemaKey,Reducer]
interface DynamicModelLoaderProps {
    name: StateSchemaKey;
    reducer: Reducer;
}
export const DynamicModelLoader: FC<DynamicModelLoaderProps> = (props) => {
    const {
        name,
        reducer,
        children,
    } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        store.reducerManager.add(name, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
        return () => {
            store.reducerManager.remove(name);
            dispatch({ type: `@DESTROY ${name} reducer` });
        };
    }, []);

    return (
        <>
            {children}
        </>
    );
};
