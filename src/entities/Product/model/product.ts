export interface Price {
    current: number;
    previous: number;
}

export interface Product {
    id: string;
    image: string;
    title: string;
    price: Price;
    starRating: number;
    priceSymbol: string;
    description: string;
}
