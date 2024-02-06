export interface Price {
    current: number;
    previous: number;
}

export enum ProductType {
    PC = 'pc',
    PHONE = 'phone',
    ACCESSORIES = 'accessories',
}

export interface Product {
    id: string;
    image: string;
    title: string;
    price: Price;
    type: ProductType;
    starRating: number;
    priceSymbol: string;
    description: string;
}
