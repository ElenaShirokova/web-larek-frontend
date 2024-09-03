import { ensureElement } from "../utils/utils";
import { Component } from "./base/component";
import { IPage, ICard, IModal, IProduct, IBasket, ICardBasket, ISettingsOrder, IUserInfo, ISuccessPage } from "../types";
import { IEvents } from "./base/events";
import { ModalBase } from "./modal";


// Класс отображения главной страницы
export class Page extends Component<IPage> implements IPage {
    protected productsContainer: HTMLElement;
    protected numberProducts: HTMLElement;
    protected basketButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.productsContainer = ensureElement('.gallery', this.container);
        this.numberProducts = ensureElement('.header__basket-counter', this.container);
        this.basketButton = ensureElement('.header__basket', this.container) as HTMLButtonElement;
        this.basketButton.addEventListener('click', () => this.events.emit('basketIcon:click'));
    }

    set productList(items: HTMLElement[]) {
        this.productsContainer.replaceChildren(...items);
    }

    set counterBasket(value: number) {
        this.setText(this.numberProducts, value);
    }
}


// Класс отображения карточки товара
export class Card extends Component<ICard> {
    protected categoryItem: HTMLElement;
    protected titleItem: HTMLElement;
    protected imageItem: HTMLImageElement;
    protected priceItem: HTMLElement;
    protected galleryButton: HTMLButtonElement;
    protected _id: string;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.categoryItem = ensureElement('.card__category', this.container);
        this.titleItem = ensureElement('.card__title', this.container);
        this.imageItem = ensureElement('.card__image', this.container) as HTMLImageElement;
        this.priceItem = ensureElement('.card__price', this.container);
        this.galleryButton = this.container as HTMLButtonElement;
        this.galleryButton.addEventListener('click', () => this.events.emit('card:click', {id: this._id}));
    }

    // устанавливает id товара
    set id(value: string) {
        this._id = value;
    };

    // устанавливает категорию товара
    set category(value: string) {
        this.setText(this.categoryItem, value);
    };

    // устанавливает название товара
    set title(value: string) {
        this.setText(this.titleItem, value);
    };

    // устанавливает изображение товара
    set image(value: string) {
        this.setImage(this.imageItem, value);
    };

    // устанавливает цену товара
    set price(value: number) {
        this.setText(this.priceItem, `${value} синапсов`);
    };
}


// Класс основы модального окна
export class Modal extends ModalBase<IModal> implements IModal {
    protected contentContainer: HTMLElement;
    protected closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.contentContainer = ensureElement('.modal__content', this.container);
        this.closeButton = ensureElement('.modal__close', this.container) as HTMLButtonElement;
        this.closeButton.addEventListener('click', () => this.events.emit('closeModal:click'));
    }

    set contentModal(data: HTMLElement) {
        this.contentContainer.replaceChildren(data);
    };
}


// Класс отображения карточки товара в модальном окне
export class CardPreview extends Card implements IProduct {
    protected textItem: HTMLElement;
    protected inBasketButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
        this.categoryItem = ensureElement('.card__category_other', this.container);
        this.textItem = ensureElement('.card__text', this.container);
        this.inBasketButton = ensureElement('.button', this.container) as HTMLButtonElement;
        this.inBasketButton.addEventListener('click', () => this.events.emit('inBasket:click', {id: this._id}));
    }

    set description(value: string) {
        this.setText(this.textItem, value);
    };
}


// Класс отображения корзины в модальном окне
export class Basket extends Component<IBasket> implements IBasket {
    protected productsContainer: HTMLElement;
    protected totalOrder: HTMLElement;
    protected placeOrderButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.productsContainer = ensureElement('.basket__list', this.container);
        this.totalOrder = ensureElement('.basket__price', this.container);
        this.placeOrderButton = ensureElement('.button', this.container) as HTMLButtonElement;
        this.placeOrderButton.addEventListener('click', () => this.events.emit('placeOrder:click'));
    };

    set productArray(items: HTMLElement[]) {
        this.productsContainer.replaceChildren(...items);
    };

    set total(value: number) {
        this.totalOrder.textContent = `${value} синапсов`
    };
}


// Класс отображения элемента списка товаров в корзине
export class CardBasket extends Card implements ICardBasket {
    protected itemIndex: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
        this.itemIndex = ensureElement('.basket__item-index', this.container);
        this.deleteButton = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;
        this.deleteButton.addEventListener('click', () => this.events.emit('delete:click', {id: this._id}));
    }

    set indexItem(value: number) {};
}


// Класс отображения формы настроек заказа(способа оплаты и адреса доставки)
export class SettingsOrder extends Component<ISettingsOrder> implements ISettingsOrder {
    protected formElement: HTMLFormElement;
    protected paymentOnlineButton: HTMLButtonElement;
    protected paymentReceiptButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;
    protected nextButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
		this.addressInput = ensureElement('.form__input', this.container) as HTMLInputElement;
        this.paymentOnlineButton = ensureElement('.order__buttons', this.container).firstChild as HTMLButtonElement;
        this.paymentReceiptButton = ensureElement('.order__buttons', this.container).lastChild as HTMLButtonElement;
        this.nextButton = ensureElement('.modal__actions', this.container).firstChild as HTMLButtonElement;
        this.addressInput.addEventListener('change', () => this.events.emit('inputAddress:change', {value: this.addressInput.value}));
        this.paymentOnlineButton.addEventListener('click', () => this.events.emit('payment:click', {payment: 'online'}));
        this.paymentReceiptButton.addEventListener('click', () => this.events.emit('payment:click', {payment: 'receipt'}));
        this.nextButton.addEventListener('click', () => this.events.emit('settingsNext:click'));
    }

    set address(data: string) {
        this.addressInput.value = data;
    }

    set payment(data: string) {};
}


// Класс отображения формы настроек данных пользователя
export class UserInfo extends Component<IUserInfo> implements IUserInfo {
    protected formElement: HTMLFormElement;
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
    protected nextButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        const orderTag = ensureElement('.order', this.container) as HTMLElement;
		this.emailInput = ensureElement('input', orderTag).firstChild as HTMLInputElement;
        this.phoneInput = ensureElement('input', orderTag).lastChild as HTMLInputElement;
        this.nextButton = ensureElement('.button', this.container) as HTMLButtonElement;
        this.emailInput.addEventListener('change', () => this.events.emit('inputEmail:change', {value: this.emailInput.value}));
        this.phoneInput.addEventListener('change', () => this.events.emit('inputPhone:change', {value: this.phoneInput.value}));
        this.nextButton.addEventListener('click', () => this.events.emit('userInfoNext:click'));
    }

    set email(data: string) {
        this.emailInput.value = data;
    }

    set phone(data: string) {
        this.phoneInput.value = data;
    }
}


// Класс отображения результата оформления заказа
export class SuccessPage extends Component<ISuccessPage> implements ISuccessPage {
    protected totalOrder: HTMLElement;
    protected nextButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.totalOrder = ensureElement('.film__description', this.container) as HTMLElement;
        this.nextButton = ensureElement('.order-success__close', this.container) as HTMLButtonElement;
        this.nextButton.addEventListener('click', () => this.events.emit('success:click'));
    }

    set total(value: number) {
        this.setText(this.totalOrder, `Списано ${String(value)} синапсов`);
    }
}
