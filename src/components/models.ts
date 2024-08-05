import { IProduct, IOrder } from "../types";
import { IEvents } from "./base/events";

// класс модели товара
export class ProductModel {
    protected items: IProduct[] = [];
    constructor(protected events: IEvents) {}

    //загрузить массив объектов Product
    setProductsList(items: IProduct[]) {
        this.events.emit('product_items_set: changed');
    };

    //добавить в массив объект Product
    addProduct(item: IProduct) {
        this.events.emit('product_items_add_item: changed');
    };

    //получить объект Product
    getProduct(id: string) {};

    //получить массив объектов Product
    getProductsList() {};
}

// класс модели заказа
export class OrderModel {
    protected items: IOrder[] = [];
    constructor(protected events: IEvents) {}

    //добавить в массив объектов объект Order
    addOrder(item: IOrder) {
        this.events.emit('order_items_add_item: changed');
    };

    //получить объект Order
    getOrder(id: string) {};

    //изменить объект Order
    editOrder(id: string, data: Partial<IOrder>) {
        this.events.emit('order_items_edit_item: changed');
    };

    //отправить заказ на сервер
    sendOrder(item: IOrder) {};

    //добавить товар в заказ
    addProduct(id: string, data: string) {
        this.events.emit('order_items_add_product: changed');
    };

    //удалить товар из заказа
    removeProduct(id: string, data: string) {
        this.events.emit('order_items_remove_product: changed');
    };

    //получить список id товаров в заказе
    getArrIdProduct(id: string) {};

    //получить полную стоимость заказа
    getTotalOrder(id: string) {};

    //получить количество товаров в заказе
    getCounter(id: string) {};
}