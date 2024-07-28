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
export interface ProductAPI {
    getProduct: () => Promise<ProductItem[]>;
    orderProducts: (order: OrderRequest) => Promise<OrderResponse>;
}


// Интерфейс вывода информации на экран пользователя
// Интерфейс карточки товара в списке на главной странице
export interface ProductCard {
    id: string;
    category: string;
    title: string;
    image: string;
    price: number;
}

// Интерфейс товара
export interface Product {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    price: number;
}

// Интерфейс карточки товара в корзине
export interface ProductMini {
    id: string;
    title: string;
    price: number;
}

// Интерфейс данных по оплате и доставке
 export interface OrderPayAddr {
    payment: string;
    address: string;
 }

// Интерфейс данных пользователя
export interface UserInfo {
    email: string;
    phone: string;
}

// Главная страница
export interface MainData {
	counter: number;
	items: ProductCard[];
}

export interface MainSettings {
	onOpenBasket: () => void;
	onOpenProduct: (id: string) => void;
}

// Модальное окно товара
export interface ProductData {
    item: Product;
}

export interface ProductSettings {
    addProductBasket: (id: string) => void;
    onClose: () => void;
}

// Модальное окно Корзина
export interface BasketData {
	items: ProductMini[];
}

export interface BasketSettings {
	onRemove: (id: string) => void;
	onClose: () => void;
	onNext: () => void;
}

// Модальное окно настройки заказа
export interface OrderData {
    item: OrderPayAddr;
}

export interface OrderSettings {
	onClose: () => void;
	onNext: () => void;
}

// Модальное окно данных пользователя
export interface UserData {
    item: UserInfo;
}

export interface UserSettings {
	onClose: () => void;
	onNext: () => void;
}

// Финишная страница
export interface SuccessSettings {
	onClose: () => void;
    onBackMain: () => void;
}

// Общее для модальных окон
export interface ModalScreenSettings {
	onClose: () => void;
	onNext: () => void;
}


// Модель данных приложения
export interface AppState {
	// Загружаемые с сервера данные
	products: Map<string, ProductItem>;

	// Заполняемые пользователем данные
	basket: Map<string, ProductMini>;
    payaddr: OrderPayAddr;
	contacts: UserInfo;
	order: OrderRequest;

	// Состояние интерфейса
	openedModal: boolean;
	isOrderReady: boolean;
	modalMessage: string;
	isError: boolean;

	// Действия с API
	loadProducts(): Promise<void>;
	loadProduct(id: string): Promise<void>;
	orderProducts(order: OrderRequest): Promise<OrderResponse>;

	// Действия с localStorage
	restoreState(): void;
	persistState(): void;

	// Пользовательские действия
	removeProduct(id: string): void;
    fillPayAddr(payaddr: Partial<OrderPayAddr>): void;
	fillContacts(contacts: Partial<UserInfo>): void;
	isValidContacts(): boolean;

	// Методы для работы с модальными окнами
	openModal(modal: ModalScreenSettings): void;
	setMessage(message: string | null, isError: boolean): void;
}
