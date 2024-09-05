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

    //получить массив объектов Product
    getProductsList() {
        return this.items
    };
}

// класс модели заказа
export class OrderModel {
    protected order: IOrder = {
        payment: 'online',
        email: '',
        phone: '',
        address: '',
        items: []
    };

    constructor(protected events: IEvents) {};

    //изменить объект Order
    editOrder(data: Partial<IOrder>) {
        Object.assign(this.order, data);
        // this.events.emit('order_items:edit_item');
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

    // отправить заказ на сервер
    sendOrder() {};
}



// export class OrderModel {
//     protected items: IOrder[] = [];

//     constructor(protected events: IEvents) {}

//     //добавить в массив объектов объект Order
//     addOrder(item: IOrder) {
//         this.items = [item, ...this.items]
//         // this.events.emit('order_items:add_item');
//     };

//     //получить объект Order
//     getOrder(id: string) {
//         return this.items.find((item) => item.id === id);
//     };

//     //изменить объект Order
//     editOrder(id: string, data: Partial<IOrder>) {
//         const item = this.getOrder(id);
//         if (item) {
//             Object.assign(item, data);
//             // this.events.emit('order_items:edit_item');
//         }
//     };

//     //отправить заказ на сервер
//     sendOrder(item: IOrder) {};

//     //добавить товар в заказ
//     addProduct(id: string, data: string) {
//         const item = this.getOrder(id);
//         if (item) {
//             item.items = [data, ...item.items]
//             this.events.emit('order_items:add_item', { _id: id });
//         }
//     };

//     //удалить товар из заказа
//     removeProduct(id: string, data: string) {
//         const item = this.getOrder(id);
//         if (item) {
//             item.items = item.items.filter(function(item) {
//                 return item !== data
//         })
//         // this.events.emit('order_items:remove_product');
//         }
//     };

//     //получить список id товаров в заказе
//     getArrIdProduct(id: string) {
//         const item = this.getOrder(id);
//         return item.items
//     };

//     //получить полную стоимость заказа
//     getTotalOrder(id: string, items: IProduct[]) {
//         let counter = 0;
//         const listProduct = this.getArrIdProduct(id);
//         listProduct.forEach((item) => {
//             const product = items.find((item_obj) => item_obj.id === item);
//             counter += product.price
//         });
//         return counter
//     };

//     //получить количество товаров в заказе
//     getCounter(id: string) {
//         const item = this.getOrder(id);
//         return item.items.length
//     };

//     //валидация поля email
//     validateEmail(data: string) {};

//     //валидация поля phone
//     validatePhone(data: string) {};

//     //валидация поля address
//     validateAddress(data: string) {};
// }
