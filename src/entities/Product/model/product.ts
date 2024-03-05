export interface Price {
    current: number;
    previous: number;
}

export enum ProductCategory {
    PC = 'pc',
    PHONE = 'phone',
    ACCESSORIES = 'accessories',
}

export enum ProductModel {
    APPLE = 'apple',
}

export interface Product {
    id: string;
    imageSrc: string;
    title: string;
    price: Price;
    color: string;
    category: ProductCategory;
    starRating?: number;
    description?: string;
}
