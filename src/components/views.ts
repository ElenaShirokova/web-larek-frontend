import { ensureElement } from "../utils/utils";
import { Component } from "./base/component";
import { IPage, ICard } from "../types";
import { IEvents } from "./base/events";


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
        this.setText(this.numberProducts, `${String(value)}`);
    }
}


// Класс отображения карточки товара
export class Card extends Component<ICard> {
    protected categoryItem: HTMLElement;
    protected titleItem: HTMLElement;
    protected imageItem: HTMLElement;
    protected priceItem: HTMLElement;
    protected galleryButton: HTMLButtonElement;
    protected _id: number;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.categoryItem = ensureElement('.card__category card__category_soft', this.container);
        this.titleItem = ensureElement('.card__title', this.container);
        this.imageItem = ensureElement('.card__image', this.container);
        this.priceItem = ensureElement('.card__price', this.container);
        this.galleryButton = ensureElement('.gallery__item card', this.container) as HTMLButtonElement;
        this.galleryButton.addEventListener('click', () => this.events.emit('card:click', {id: this._id}));
    }

    set id(value: number) {};
    set category(value: string) {};
    set title(value: string) {};
    set image(value: string) {};
    set price(value: number) {};
}