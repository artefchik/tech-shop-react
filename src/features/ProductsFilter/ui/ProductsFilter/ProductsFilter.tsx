import { Popover } from 'shared/ui/DropdownsList';
import filter from 'shared/assets/icons/filters.svg';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { ProductsBrandFilter } from '../ProductsBrandFilter/ProductsBrandFilter';
import { ProductsSortOrder } from '../ProductsSortOrder/ProductsSortOrder';
import { ProductsModelFilter } from '../ProductsModelFilter/ProductsModelFilter';
import { ProductsColorFilter } from '../ProductsColorFilter/ProductsColorFilter';
import { productsFiltersReducer } from '../../model/slice/ProductsFilterSlice';

interface ProductsFilterProps {
    className?: string;
    fetchData: () => void;
    category?: string;
}
const reducers: ReducersList = {
    productsFilters: productsFiltersReducer,
};

export const ProductsFilter = (props: ProductsFilterProps) => {
    const { className, fetchData, category } = props;
    const openView = isMobile ? 'bottom' : 'bottomLeft';
    // const width = isMobile ? '96vw' : 280;
    const { t } = useTranslation();
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Popover
                // width={width}
                title={t('Filters')}
                icon={filter}
                height={230}
                fullWidthClass={className}
            >
                <ProductsModelFilter onSend={fetchData} />
                <ProductsBrandFilter onSend={fetchData} />
                <ProductsColorFilter onSend={fetchData} category={category} />
                <ProductsSortOrder onSend={fetchData} />
            </Popover>
        </DynamicModuleLoader>
    );
};
