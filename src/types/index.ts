// Интерфейс модели объекта Товар
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

// Тип интерфейса способа оплаты заказа
type PaymentElement = 'Онлайн' | 'При получении';
// Интерфейс модели объекта Заказ
export interface IOrder {
    id: string;
    payment: PaymentElement;
    email: string;
    phone: string;
    address: string;
    items: string[]; //id товаров
}


// Интерейс API
//API - "name": "Product Item" - response 200
export interface ProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

// API - "name": "Product List" - response 200
export interface ProductList {
    total: number;
    items: ProductItem[];
}

// API - "name": "Order" - request
export interface OrderRequest {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[]; //id товаров
}

// API - "name": "Order" - response 200
export interface OrderResponse {
    id: string;
    total: number;
}

// API - response 4XX
export interface ResponseError {
    error: string;
}

// Интерфейс API-клиента
export interface API {
    getProduct: (id: string) => Promise<ProductItem>;
    getProducts: () => Promise<ProductItem[]>;
    orderProducts: (order: OrderRequest) => Promise<OrderResponse>;
}


// Интерфейс главной страницы
export interface IPage {
    productList: HTMLElement[];
    counterBasket: number;
}

// Интерфейс карточки товара на главной странице
export interface ICard {
    id: number;
    category: string;
    title: string;
    image: string;
    price: number;
}