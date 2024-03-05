import { Popover } from 'shared/ui/DropdownsList';
import filter from 'shared/assets/icons/filters.svg';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProductsBrandFilter } from 'features/ProductsFilter/ui/ProductsBrandFilter/ProductsBrandFilter';
import { ProductsSortOrder } from '../ProductsSortOrder/ProductsSortOrder';
import { ProductsModelFilter } from '../ProductsModelFilter/ProductsModelFilter';
import { ProductsColorFilter } from '../ProductsColorFilter/ProductsColorFilter';
import { productsFiltersReducer } from '../../model/slice/ProductsFilterSlice';

interface ProductsFilterProps {
    className?: string;
    fetchData: () => void;
}
const reducers: ReducersList = {
    productsFilters: productsFiltersReducer,
};

export const ProductsFilter = (props: ProductsFilterProps) => {
    const { className, fetchData } = props;
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Popover
                title="Фильтры"
                icon={filter}
                openView="bottomLeft"
                className={className}
            >
                <ProductsModelFilter onSend={fetchData} />
                <ProductsBrandFilter onSend={fetchData} />
                <ProductsColorFilter onSend={fetchData} />
                <ProductsSortOrder onSend={fetchData} />
            </Popover>
        </DynamicModuleLoader>
    );
};
