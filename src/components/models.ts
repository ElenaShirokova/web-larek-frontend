import { IProduct, IOrder } from "../types";
import { IEvents } from "./base/events";

// класс модели товара
export class ProductModel {
    protected items: IProduct[] = [];
    constructor(protected events: IEvents) {}

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

    //получить массив объектов Product
    getProductsList() {
        return this.items
    };
}

// класс модели заказа
export class OrderModel {
    protected items: IOrder[] = [];
    constructor() {}
    // constructor(protected events: IEvents) {}

    //добавить в массив объектов объект Order
    addOrder(item: IOrder) {
        this.items = [item, ...this.items]
        // this.events.emit('order_items:add_item');
    };

    //получить объект Order
    getOrder(id: string) {
        return this.items.find((item) => item.id === id);
    };

    //изменить объект Order
    editOrder(id: string, data: Partial<IOrder>) {
        const item = this.getOrder(id);
        if (item) {
            Object.assign(item, data);
            // this.events.emit('order_items:edit_item');
        }
    };

    //отправить заказ на сервер
    sendOrder(item: IOrder) {};

    //добавить товар в заказ
    addProduct(id: string, data: string) {
        const item = this.getOrder(id);
        if (item) {
            item.items = [data, ...item.items]
            // this.events.emit('order_items:edit_item');
        }
    };

    //удалить товар из заказа
    removeProduct(id: string, data: string) {
        const item = this.getOrder(id);
        if (item) {
            item.items = item.items.filter(function(item) {
                return item !== data
        })
        // this.events.emit('order_items:remove_product');
        }
    };

    //получить список id товаров в заказе
    getArrIdProduct(id: string) {
        const item = this.getOrder(id);
        return item.items
    };

    //получить полную стоимость заказа
    getTotalOrder(id: string, items: IProduct[]) {
        let counter = 0;
        const listProduct = this.getArrIdProduct(id);
        listProduct.forEach((item) => {
            const product = items.find((item_obj) => item_obj.id === item);
            counter += product.price
        });
        return counter
    };

    //получить количество товаров в заказе
    getCounter(id: string) {
        const item = this.getOrder(id);
        return item.items.length
    };

    //валидация поля email
    validateEmail(data: string) {};

    //валидация поля phone
    validatePhone(data: string) {};

    //валидация поля address
    validateAddress(data: string) {};
}