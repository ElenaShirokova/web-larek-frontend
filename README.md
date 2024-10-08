# Проектная работа "Веб-ларек"

## Стек:
* HTML;
* SCSS;
* TS;
* Webpack;
* ООП.

## Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

## Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Описание проекта
Проект "Веб-ларек" реализует пример типового интернет магазина, в данном случае для продажи цифровых товаров. Пользователь может просматривать список товаров, посмотреть детальную информацию о каждом товаре, положить заинтересовавший его товар в корзину и оформить покупку. Проект реализован на TypeScript и представляет собой SPA (Single Page Application) с использованием API для получения данных о товарах.

## Описание интерфейса
Интерфейс можно условно разделить на 3 процесса:
Просмотр списка товаров, просмотр детальной информации о товаре и оформление заказа.
Так как согласно дизайну модальные окна в проекте однотипные, то их общая логика и структура вынесена в абстрактный класс ModalBase. В проекте реализовано одно модальное окно класс Modal в котором меняется контент.

## Архитектура проекта (MVP)
Проект разработан в стиле объектно-ориентированного программирования (ООП), событийно-ориентированная модель, по паттерну архитектуры MVP (Model-View-Presenter). Согласно принципу разделения отображения и данных, приложение имеет три слоя:
1. Слой данных (Model) — данные. Этот слой содержит значительную часть бизнес-логики.
2. Слой отображения (View) — интерфейс для взаимодействия с пользователем, выводит информацию на экран и генерирует события с действиями пользователя.
3. Слой управления (Presenter) - связь между моделью и отображением, обработка и передача данных.

## Данные и типы данных, используемые в приложении
Все данные, используемые в проекте, разделены на два интерфейса:
- Интерфейс объекта Товар:

```
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}
```

- Интерфейс объекта Заказ:

```
interface IOrder {
    payment: PaymentElement;
    email: string;
    phone: string;
    address: string;
    items: string[]; //id товаров
}
```

- Тип интерфейса способа оплаты заказа

```
type PaymentElement = 'Онлайн' | 'При получении' | '';
```

- Интерейс API единицы товара

```
interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}
```

- Интерейс API списка товаров

```
interface IProductList {
    total: number;
    items: IProductItem[];
}
```

- Интерейс API отправки заказа на сервер

```
interface OrderRequest {
    payment: PaymentElement;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[]; //id товаров
}
```

- Интерейс API ответа на отправку заказа на сервер

```
interface OrderResponse {
    id: string;
    total: number;
}
```

- Интерфейс API-клиента

```
interface API {
    getProduct: (id: string) => Promise<IProductItem>;
    getProducts: () => Promise<IProductList>;
    orderProducts: (order: OrderRequest) => Promise<OrderResponse>;
}
```

- Интерфейс главной страницы

```
interface IPage {
    productList: HTMLElement[];
    counterBasket: number;
}
```

- Интерфейс карточки товара на главной странице

```
interface ICard {
    id: string;
    category: string;
    title: string;
    image: string;
    price: number;
}
```

- Интерфейс модального окна

```
interface IModal {
    contentModal: HTMLElement;
}
```

- Интерфейс корзины

```
interface IBasket {
    productArray: HTMLElement[];
    total: number;
    valid: boolean;
}
```

- Интерфейс карточки товара в корзине

```
interface ICardBasket {
    title: string;
    price: number;
    indexItem: number;
    id: string;
}
```

- Интерфейс настроек заказа(способ оплаты и адрес доставки)

```
interface ISettingsOrder {
    address: string;
    payment: PaymentElement;
    error: string;
    valid: boolean;
}
```

- Интерфейс настроек заказа(контакты юзера)

```
interface IUserInfo {
    email: string;
    phone: string;
    error: string;
    valid: boolean;
}
```

- Интерфейс отображения финишной страницы

```
interface ISuccessPage {
    total: number;
}
```

## Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы:
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие

### Слой данных

#### Класс ProductModel
Класс является моделью данных, предназначен для хранения и работы с данными объектов Товаров. В конструктор класса передается сигнализатор брокера событий events: IEvents, который применяется в методах класса для сигнализации о событии изменения данных в модели.
Поля класса:
- items: IProduct[] - предназначено для хранения массива данных объектов Товар типа IProduct.
Методы класса:
- setProductsList(items: IProduct[]) - предназначен для загрузки массива объектов типа IProduct, метод имеет сигнализатор события брокера событий;
- addProduct(item: IProduct) - предназначен для добавления в массив объекта типа IProduct, метод имеет сигнализатор события брокера событий;
- getProduct(id: string) -  предназначен для получения одного объекта типа IProduct по его id;
- getProductsList() - предназначен для получения всего массива объектов типа IProduct;
- getProductsArr(arr_id: string[]) - предназначен для получения массива объектов типа IProduct по списку id;
- getProductsArrNotNull(arr_id: string[]) - предназначен для получения массива id товаров с ненулевой ценой;
- getTotalBasket(arr_id: string[]) - предназначен для получения полной стоимости корзины.

#### Класс OrderModel
Класс OrderModel является моделью данных, предназначен для хранения и работы с данными объекта Заказа. В конструктор класса передается сигнализатор событий events: IEvents, который применяется в методах класса для сигнализации о событии изменения данных в модели.
Поля класса:
- protected order: IOrder = {payment: '', email: '', phone: '', address: '',
items: []} - предназначено для хранения данных объекта Заказ типа IOrder.
Методы класса:
- editOrder(data: Partial<IOrder>) - предназначен для изменения объекта заказа типа IOrder;
- getArrIdProduct() - предназначен для получения массива id товаров в заказе;
- getCounter() - предназначен для получения количества товаров в заказе;
- addProduct(data: string) - предназначен для добавления в массив id товаров в заказе (в поле items: string[]) еще одного id товара, метод имеет сигнализатор события брокера событий;
- removeProduct(data: string) - предназначен для удаления из массива id товаров в заказе (в поле items: string[]) id товара, метод имеет сигнализатор события брокера событий;
- getOrderPayment() - предназначен для получения текущего способа оплаты заказа;
- getOrderAddress() - предназначен для получения текущего адресс доставки;
- getOrderEmail() - предназначен для получения текущего значения почты пользователя;
- getOrderPhone() - предназначен для получения текущего значения телефона пользователя;
- getOrder() - предназначен для получения объекта заказа.

### Классы представления
Все классы представления отвечают за отображение внутри контейнера (DOM-элемент) передаваемых в них данных.

#### Базовый Класс Component
Абстрактный класс Component<T> предназначен для работы с DOM в дочерних компонентах. Конструктор класса принимает контейнер с html-элементом над которым методы класса выполняют действия.
Методы класса:
- toggleClass(element: HTMLElement, className: string, force?: boolean) - предназначен для переключения класса;
- setText(element: HTMLElement, value: unknown) - устанавливает текстовое содержимое html-элементу;
- setDisabled(element: HTMLElement, state: boolean) - предназначен для смены статуса блокировкиж
- setHidden(element: HTMLElement) - предназначен для управления видимостью элемента, скрывает элемент;
- setVisible(element: HTMLElement) - предназначен для управления видимостью элемента, делает элемент видимым;
- setImage(element: HTMLImageElement, src: string, alt?: string) - предназначен для установки изображения с алтированным текстом;
-  render(data?: Partial<T>) - метод возвращает корневой DOM-элемент.

#### Класс ModalBase
Реализует модальное окно. Так же предоставляет методы `open` и `close` для управления отображением модального окна. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку-крестик для закрытия попапа.
Конструктор принимает контейнер, по которому в разметке страницы будет идентифицировано модальное окно и экземпляр класса `EventEmitter` для возможности инициации событий.
Поля класса:
- modal: HTMLElement - элемент модального окна;
- events: IEvents - брокер событий.

#### Класс Page
Класс отображения главной страницы Page расширяет класс Component по интерфейсу IPage. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- productsContainer: HTMLElement - родительский элемент верстки, содержащий список товаров;
- numberProducts: HTMLElement - элемент верстки, текст которого показывает количество товаров в корзине;
- basketButton: HTMLButtonElement - элемент верстки корзины в header, кликом по которому открывается модальное окно корзины, на него установлен сигнализатор события брокера событий.
Методы класса:
- set productList(items: HTMLElement[]) - устанавливает список товаров;
- set counterBasket(value: number) - устанавливает количество товаров в корзине.

#### Класс Card
Для отображения карточки товара в списке товаров на главной странице написан класс Card, который расширяет класс Component по интерфейсу ICard. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- categoryItem: HTMLElement - элемент верстки, текст которого это название категории товара;
- titleItem: HTMLElement - элемент верстки, текст которого это название товара;
- imageItem: HTMLElement - элемент верстки изображения, хранит ссылку на изображение;
- priceItem: HTMLElement - элемент верстки, текст которого это цена товара;
- galleryButton: HTMLButtonElement - элемент верстки, по клику на который должно открываться модальное окно просмотра детализации товара, на него установлен сигнализатор события брокера событий;
- _id: string - id товара в карточке.
Методы класса:
- set id(value: string) - устанаввливает id товара в карточке;
- set category(value: string) - устанавливает название категории товара в элемент верстки;
- set title(value: string) -  устанавливает название товара в элемент верстки;
- set image(value: string) - устанавливает картинку товара в элемент верстки;
- set price(value: number) -  устанавливает цену товара в элемент верстки.

#### Класс Modal
Класс основы модального окна Modal расширяет класс ModalBase по интерфейсу IModal. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- contentContainer: HTMLElement - родительский элемент верстки модального окна, содержащий сменный контент модальных окон;
- closeButton: HTMLButtonElement - элемент верстки кнопки закрытия модального окна.
Методы класса:
-  set contentModal(data: HTMLElement) - устанавливает контент модального окна.

#### Класс CardPreview
Класс отображения карточки товара в модальном окне CardPreview расширяет класс Card по интерфейсу IProduct. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- textItem: HTMLElement - элемент верстки, текст которого это описание товара;
- inBasketButton: HTMLButtonElement - элемент верстки кнопки "В корзину", кликом по которой товар добавляется в корзину, если его еще нет в корзине или удаляется, если товар уже есть в корзине; на него установлен сигнализатор события брокера событий.
Методы класса:
- set description(value: string) - устанавливает описание товара в окне превью;
- buttonText(value: string) - устанавливает надпись на кнопке, в зависимости от наличия просматриваемого товара в корзине: если товара нет в корзине - надпись "В корзину", если товар в корзине - надпись "Из корзины".

#### Класс Basket
Класс отображения корзины в модальном окне Basket расширяет класс Component по  интерфейсу IBasket. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- productsContainer: HTMLElement - родительский элемент верстки, содержащий список товаров;
- totalOrder: HTMLElement - элемент верстки, текст которого показывает полную стоимость товаров в корзине.
- placeOrderButton: HTMLButtonElement - элемент верстки кнопки "Оформить заказ", кликом по которой запускается процесс оформления заказа, на него установлен сигнализатор события брокера событий.
Методы класса:
- set productArray(items: HTMLElement[]) - устанавливает список товаров в корзине;
- set total(value: number) - устанавливает полную стоимость товаров в корзине;
- set valid(isValid: boolean) - управляет активностью кнопки "Оформить заказ".

#### Класс CardBasket
Класс отображения карточки товара в списке товаров в корзине CardBasket расширяет класс Component по интерфейсу ICardBasket. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- itemIndex: HTMLElement - элемент верстки, текст которого это порядковый номер товара в списке корзины;
- titleItem: HTMLElement - элемент верстки, текст которого это название товара;
- priceItem: HTMLElement - элемент верстки, текст которого это цена товара;
- deleteButton: HTMLButtonElement - элемент верстки кнопки "Удалить", кликом по которой товар удаляется из корзины, на него установлен сигнализатор события брокера событий;
- _id: string - хранит id товара.
Методы класса:
- set id(value: string) - устанавливает id товара;
- set indexItem(value: number) - устанавливает порядковый номер товара в списке товаров корзины;
- set title(value: string) - устанавливает название товара;
- set price(value: number) - устанавливает цену товара.

#### Класс SettingsOrder
Класс отображения формы настроек заказа(способ оплаты и адресс) SettingsOrder расширяет класс Component по  интерфейсу ISettingsOrder. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- formElement: HTMLFormElement - элемент верстки, форма;
- paymentOnlineButton: HTMLButtonElement - элемент верстки кнопки выбора онлайн-оплаты, на него установлен сигнализатор события брокера событий;
- paymentReceiptButton: HTMLButtonElement - элемент верстки кнопки выбора оплаты при получении, на него установлен сигнализатор события брокера событий;
- addressInput: HTMLInputElement - элемент верстки поля ввода адреса доставки, на него установлен сигнализатор события брокера событий;
- nextButton: HTMLButtonElement - элемент верстки кнопки продолжения оформления звказа, на него установлен сигнализатор события брокера событий;
- errorMessage: HTMLElement - элемент верстки вывода ошибки.
Методы класса:
- set address(data: string) - устанавливает адрес в поле ввода адреса доставки;
- set payment(data: PaymentElement) - устанавливает текущий выбранный способ оплаты, выделяет его;
- set error(data: string) - устанавливает текст ошибки в поле ошибки;
- set valid(isValid: boolean) - управляет активностью кнопки "Продолжить оформление заказа".

#### Класс UserInfo
Класс отображения формы настроек заказа(контакты юзера) UserInfo расширяет класс Component по  интерфейсу IUserInfo. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- formElement: HTMLFormElement - элемент верстки, форма;
- emailInput: HTMLInputElement - элемент верстки поля ввода email, на него установлен сигнализатор события брокера событий;
- phoneInput: HTMLInputElement - элемент верстки поля ввода телефона, на него установлен сигнализатор события брокера событий;
- nextButton: HTMLButtonElement - элемент верстки кнопки продолжения оформления звказа, на него установлен сигнализатор события брокера событий;
- errorMessage: HTMLElement - элемент верстки вывода ошибки.
Методы класса:
- set email(data: string) - устанавливает email в поле ввода email;
- set phone(data: string) - устанавливает телефон в поле ввода телефона;
- set error(data: string) - устанавливает текст ошибки в поле ошибки;
- set valid(isValid: boolean) - управляет активностью кнопки "Оплатить".

#### Класс SuccessPage
Класс отображения финишной страницы SuccessPage расширяет класс Component по  интерфейсу ISuccessPage. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- totalOrder: HTMLElement - элемент верстки, текст которого показывает полную стоимость заказа.
- nextButton: HTMLButtonElement - элемент верстки кнопки, кликом по которому закрывается модальное окно, на него установлен сигнализатор события брокера событий.
Методы класса:
- set total(value: number) - устанавливает полную стоимость заказа.

### Слой коммуникации

#### Класс LarekApi
Основным классом для обмена данными с сервером является класс LarekApi, который расширяет базовый класс API.
Конструктор принимает и передает в родительский конструктор Api поля baseUrl и options.
Разрешенные типы запросов к серверу:
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
Поля класса:
- getProduct(id: string) - предназначен для get-запроса информации об одном товаре по его id;
- getProducts() - предназначен для get-запроса массива всех объектов товаров;
- orderProducts(order: OrderRequest) - предназначен для post-запроса для отправки данных оформленного заказа на сервер;

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.
В качестве брокера событий используется класс EventEmitter в классической реализации. Методы класса позволяют: установить обработчик на событие, снять обработчик с события, инициировать событие с данными, слушать все события, сбросить все обработчики, сделать коллбек триггер, генерирующий событие при вызове.
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`.
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

*Список всех событий, которые могут генерироваться в системе:*

*События изменения данных (генерируются классами моделями данных)*
- 'product_items:set_items' - изменение массива данных товаров;
- 'product_items:add_item' - добавление товара в массив данных товаров;
- 'order_items:change_order' - изменение массива данных товаров заказа;

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- 'basketIcon:click' - клик по иконке корзинки в шапке страницы;
- 'card:click' - клик по карточке товара на странице;
- 'closeModal:click' - клик по кнопке закрытия модального окна;
- 'inBasket:click' - клик по кнопке "В корзину" модального окна карточки товара;
- 'placeOrder:click' - клик по кнопке "Оформить заказ" модального окна корзины;
- 'deleteProduct:click' - клик по кнопке "Удалить" товар в модальном окне корзины;
- 'inputAddress:change' - ввод адреса в модальном окне оформления заказа;
- 'payment:click' - выбор способа оплаты заказа в модальном окне оформления заказа;
- 'inputEmail:change' - ввод email в модальном окне оформления заказа;
- 'inputPhone:change' - ввод телефона в модальном окне оформления заказа;
- 'success:click' - клик по кнопке "За новыми покупками".












