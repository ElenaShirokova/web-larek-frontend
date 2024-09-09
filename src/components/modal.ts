import { ensureElement } from "../utils/utils";
import { Component } from "./base/component";
import { IEvents } from "./base/events";


// базовый класс модального окна
export class ModalBase <T> extends Component<T> {
    protected modal: HTMLElement;
    protected events: IEvents;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
      super(container);
      this.events = events;
      this._content = ensureElement('.modal__content', container) as HTMLElement;
      const closeButtonElement = ensureElement('.modal__close', this.container) as HTMLButtonElement;
      closeButtonElement.addEventListener("click", this.close.bind(this));
      this.container.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      });
      this.handleEscUp = this.handleEscUp.bind(this);
    }

    open() {
      this.container.classList.add("modal_active");
      document.addEventListener("keyup", this.handleEscUp);
        }

    close() {
      this.container.classList.remove("modal_active");
      this._content = null;
      document.removeEventListener("keyup", this.handleEscUp);
    }

    handleEscUp (evt: KeyboardEvent) {
        if (evt.key === "Escape") {
          this.close();
        }
      };
  }
