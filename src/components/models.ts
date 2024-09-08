import { IProduct, IOrder } from "../types";
import { IEvents } from "./base/events";

// класс модели товара
export class ProductModel {
    protected items: IProduct[] = [];
    constructor(protected events: IEvents) {};

    //загрузить массив объектов Product
    setProductsList(items: IProduct[]) {
        this.items = items;
        this.events.emit('product_items:set_items');
    };

    //добавить в массив объект Product
    addProduct(item: IProduct) {
        this.items = [item, ...this.items]
        this.events.emit('product_items:add_item');
    };

    //получить объект Product
    getProduct(id: string) {
        return this.items.find((item) => item.id === id);
    };

    //получить массив всех объектов Product
    getProductsList() {
        return this.items
    };

    //получить массив объектов по списку id
    getProductsArr(arr_id: string[]) {
        return arr_id.map(item_id => this.getProduct(item_id));
    };

    //получить массив id товаров с ненулевой ценой
    getProductsArrNotNull(arr_id: string[]) {
        const arrProducts = arr_id.filter((id) => {
            const product = this.getProduct(id);
            return product.price !== null;
        });
        return arrProducts
    };

    //получить полную стоимость корзины
    getTotalBasket(arr_id: string[]) {
        let counter = 0;
        arr_id.forEach((item) => {
            const product = this.items.find((item_obj) => item_obj.id === item);
            counter += product.price
        });
        return counter
    }
}

// класс модели заказа
export class OrderModel {
    protected order: IOrder = {
        payment: '',
        email: '',
        phone: '',
        address: '',
        items: []
    };

    constructor(protected events: IEvents) {};

    //изменить объект Order
    editOrder(data: Partial<IOrder>) {
        Object.assign(this.order, data);
    }

    //получить список id товаров в заказе
    getArrIdProduct() {
        return this.order.items
    };

    //получить количество товаров в заказе
    getCounter() {
        return this.order.items.length
    };

    //добавить товар в заказ
    addProduct(data: string) {
        this.order.items = [data, ...this.order.items];
        this.events.emit('order_items:change_order');
    };

    //удалить товар из заказа
    removeProduct(data: string) {
        this.order.items = this.order.items.filter(function(item) {
            return item !== data
        });
        this.events.emit('order_items:change_order');
    }

    // получить способ оплаты заказа
    getOrderPayment() {
        return this.order.payment
    };

    // получить адресс доставки
    getOrderAddress() {
        return this.order.address
    };

    // получить почту пользователя
    getOrderEmail() {
        return this.order.email
    };

    // получить телефон пользователя
    getOrderPhone() {
        return this.order.phone
    };

    // получить объект заказа
    getOrder() {
        return this.order;
    };
}
