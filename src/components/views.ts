import { ensureElement } from "../utils/utils";
import { settings } from "../utils/constants";
import { Component } from "./base/component";
import { IPage, ICard, IModal, IProduct, IBasket, ICardBasket, ISettingsOrder, IUserInfo, ISuccessPage, PaymentElement } from "../types";
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
        this.categoryItem.classList.remove(this.categoryItem.classList[1]);
        const styleCategory: string = settings[value];
        this.categoryItem.classList.add(styleCategory);
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

    buttonText(value: string) {
        this.setText(this.inBasketButton, value);
    }
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

    set valid(isValid: boolean) {
        if (!isValid) {
            this.placeOrderButton.setAttribute('disabled', '');
        } else {
            this.placeOrderButton.removeAttribute('disabled');
        };
	}
}


// Класс отображения элемента списка товаров в корзине
export class CardBasket extends Component<ICardBasket> {
    protected itemIndex: HTMLElement;
    protected titleItem: HTMLElement;
    protected priceItem: HTMLElement;
    protected deleteButton: HTMLButtonElement;
    protected _id: string;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.itemIndex = ensureElement('.basket__item-index', this.container);
        this.titleItem = ensureElement('.card__title', this.container);
        this.priceItem = ensureElement('.card__price', this.container);
        this.deleteButton = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;
        this.deleteButton.addEventListener('click', () => this.events.emit('deleteProduct:click', {id: this._id}));
    }

    // устанавливает id товара
    set id(value: string) {
        this._id = value;
    };

    // устанавливает номер товара в списке товаров в корзине
    set indexItem(value: number) {
        this.setText(this.itemIndex, `${value}`);
    };

    // устанавливает название товара
    set title(value: string) {
        this.setText(this.titleItem, value);
    };

    // устанавливает цену товара
    set price(value: number) {
        this.setText(this.priceItem, `${value}`);
    };
}


// Класс отображения формы настроек заказа(способа оплаты и адреса доставки)
export class SettingsOrder extends Component<ISettingsOrder> implements ISettingsOrder {
    protected formElement: HTMLFormElement;
    protected paymentOnlineButton: HTMLButtonElement;
    protected paymentReceiptButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;
    protected nextButton: HTMLButtonElement;
    protected errorMessage: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.formElement = this.container as HTMLFormElement;
		this.addressInput = ensureElement('.form__input', this.container) as HTMLInputElement;
        this.paymentOnlineButton = ensureElement('button[name="card"]', this.container) as HTMLButtonElement;
        this.paymentReceiptButton = ensureElement('button[name="cash"]', this.container) as HTMLButtonElement;
        this.nextButton = ensureElement('.order__button', this.container) as HTMLButtonElement;
        this.errorMessage = ensureElement('.form__errors', this.container) as HTMLElement;
        this.addressInput.addEventListener('change', () => this.events.emit('inputAddress:change', {value: this.addressInput.value}));
        this.paymentOnlineButton.addEventListener('click', () => this.events.emit('payment:click', {paymentOrder: 'Онлайн'}));
        this.paymentReceiptButton.addEventListener('click', () => this.events.emit('payment:click', {paymentOrder: 'При получении'}));
        this.formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
            this.events.emit('settingsNext:click');
        });
    }

    set address(data: string) {
        this.addressInput.value = data;
    };

    set payment(data: PaymentElement) {
        if (data === 'Онлайн') {
            this.paymentOnlineButton.classList.remove('button_alt');
            this.paymentReceiptButton.classList.add('button_alt');
        } else if (data === 'При получении') {
            this.paymentOnlineButton.classList.add('button_alt');
            this.paymentReceiptButton.classList.remove('button_alt');
        } else {
            if (!this.paymentOnlineButton.classList.contains('button_alt')) {
                this.paymentOnlineButton.classList.add('button_alt');
            }
            if (!this.paymentReceiptButton.classList.contains('button_alt')) {
                this.paymentReceiptButton.classList.add('button_alt');
            }
        }
    };

    set error(data: string) {
        this.errorMessage.textContent = data;
    };

    set valid(isValid: boolean) {
        if (!isValid) {
            this.nextButton.setAttribute('disabled', '');
        } else {
            this.nextButton.removeAttribute('disabled');
        };
	}
}


// Класс отображения формы настроек данных пользователя
export class UserInfo extends Component<IUserInfo> implements IUserInfo {
    protected formElement: HTMLFormElement;
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
    protected nextButton: HTMLButtonElement;
    protected errorMessage: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.formElement = this.container as HTMLFormElement;
		this.emailInput = ensureElement('input[name="email"]', this.container) as HTMLInputElement;
        this.phoneInput = ensureElement('input[name="phone"]', this.container) as HTMLInputElement;
        this.nextButton = ensureElement('.button', this.container) as HTMLButtonElement;
        this.errorMessage = ensureElement('.form__errors', this.container) as HTMLElement;
        this.emailInput.addEventListener('change', () => this.events.emit('inputEmail:change', {value: this.emailInput.value}));
        this.phoneInput.addEventListener('change', () => this.events.emit('inputPhone:change', {value: this.phoneInput.value}));
        this.formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
            this.events.emit('userInfoNext:click');
        });
    }

    set email(data: string) {
        this.emailInput.value = data;
    }

    set phone(data: string) {
        this.phoneInput.value = data;
    }

    set error(data: string) {
        this.errorMessage.textContent = data;
    };

    set valid(isValid: boolean) {
        if (!isValid) {
            this.nextButton.setAttribute('disabled', '');
        } else {
            this.nextButton.removeAttribute('disabled');
        };
	}
}


// Класс отображения результата оформления заказа
export class SuccessPage extends Component<ISuccessPage> implements ISuccessPage {
    protected totalOrder: HTMLElement;
    protected nextButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.totalOrder = ensureElement('.order-success__description', this.container) as HTMLElement;
        this.nextButton = ensureElement('.order-success__close', this.container) as HTMLButtonElement;
        this.nextButton.addEventListener('click', () => this.events.emit('success:click'));
    }

    set total(value: number) {
        this.setText(this.totalOrder, `Списано ${String(value)} синапсов`);
    }
}
