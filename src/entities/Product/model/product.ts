export interface Price {
    current: number;
    previous: number;
}

export enum ProductCategory {
    PC = 'pc',
    PHONE = 'phone',
    ACCESSORIES = 'accessories',
}

export enum ProductBrand {
    APPLE = 'apple',
}

export enum ProductColor {
    BLACK = 'black',
    GREEN = 'green',
    YELLOW = 'yellow',
    BLUE = 'blue',
    PINK = 'pink',
    SILVER = 'silver',
    SPACE_GRAY = 'spaceGray',
}
export interface Product {
    id: string;
    imageSrc: string;
    title: string;
    price: Price;
    color: ProductColor;
    brand: ProductBrand;
    category: ProductCategory;
    starRating?: number;
    description?: string;
}
