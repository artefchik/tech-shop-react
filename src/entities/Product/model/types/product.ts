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

export enum ProductMemory {
    '128GB' = '128GB',
    '256GB' = '256GB',
    '512GB' = '512GB',
    '1024GB' = '1024GB',
}
export interface Product {
    id: string;
    imageSrc: string;
    title: string;
    price: Price;
    color: ProductColor;
    brand: string;
    category: ProductCategory;
    starRating?: number;
    memory: ProductMemory;
    description?: string;
}
