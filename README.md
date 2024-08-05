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
Так как модальные окна в проекте однотипные, то их общая логика и структура вынесена в абстрактный класс ModalScreen. Все модальные окна наследуются от него и переопределяют методы для своих нужд.

## Архитектура проекта (MVP)
Проект разработан в стиле объектно-ориентированного программирования (ООП), событийно-ориентированная модель, по паттерну архитектуры MVP (Model-View-Presenter). Согласно принципу разделения отображения и данных, приложение имеет три слоя:
1. Слой данных (Model) — данные. Этот слой содержит значительную часть бизнес-логики.
2. Слой отображения (View) — интерфейс для взаимодействия с пользователем, выводит информацию на экран и генерирует события с действиями пользователя.
3. Слой управления (Presenter) - связь между моделью и отображением, обработка и передача данных.

## Модели
### Данные
Все данные, используемые в проекте, разделены на два интерфейса:
- Интерфейс объекта Товар:
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

- Интерфейс объекта Заказ:
export interface IOrder {
    id: string;
    payment: PaymentElement;
    email: string;
    phone: string;
    address: string;
    items: string[]; //id товаров
}
Тип интерфейса способа оплаты заказа
type PaymentElement = 'Онлайн' | 'При получении';

### Классы
Класс ProductModel является моделью данных, предназначен для хранения и работы с данными объектов Товаров. В конструктор класса передается сигнализатор событий events: IEvents, который применяется в методах класса для сигнализации о событии изменения данных в модели.
Поля класса:
- items: IProduct[] - предназначено для хранения массива данных объектов Товар типа IProduct.
Методы класса:
- setProductsList(items: IProduct[]) - предназначен для загрузки массива объектов типа IProduct, метод имеет сигнализатор события брокера событий;
- addProduct(item: IProduct) - предназначен для добавления в массив объекта типа IProduct, метод имеет сигнализатор события брокера событий;
- getProduct(id: string) -  предназначен для получения одного объекта типа IProduct по его id;
- getProductsList() - предназначен для получения всего массива объектов типа IProduct

Класс OrderModel является моделью данных, предназначен для хранения и работы с данными объектов Заказов. В конструктор класса передается сигнализатор событий events: IEvents, который применяется в методах класса для сигнализации о событии изменения данных в модели.
Поля класса:
- items: IOrder[] - предназначено для хранения массива данных объектов Заказ типа IOrder.
Методы класса:
- addOrder(item: IOrder) - предназначен для добавления в массив объекта типа IOrder, метод имеет сигнализатор события брокера событий;
- getOrder(id: string) - предназначен для получения одного объекта типа IOrder по его id;
- editOrder(id: string, data: Partial<IOrder>) - предназначен для изменения объекта типа IOrder, метод имеет сигнализатор события брокера событий;
- sendOrder(item: IOrder) - предназначен для отправки объекта заказа типа IOrder на сервер;
- addProduct(id: string, data: string) - предназначен для добавления в массив id товаров в заказе (в поле items: string[]) еще одного id товара, метод имеет сигнализатор события брокера событий;
- removeProduct(id: string, data: string) - предназначен для удаления из массива id товаров в заказе (в поле items: string[]) id товара, метод имеет сигнализатор события брокера событий;
- getArrIdProduct(id: string) - предназначен для получения массива id товаров в заказе по id заказа;
- getTotalOrder(id: string) - предназначен для получения полной стоимости заказа по id заказа;
- getCounter(id: string) - предназначен для получения количества товаров в заказе по id заказа;
- validateEmail(data: string) - валидация поля email;
- validatePhone(data: string) - валидация поля phone;
- validateAddress(data: string) - валидация поля address;

За коммуникацию приложения с внешним миром (сервером) отвечают классы API.
Базовый класс API предназначен для обмена данными с сервером.
Конструктор класса принимает и передает в родительский конструктор Api поля baseUrl и options.
Поля класса:
- baseUrl: string - предназначено для хранения базового url для подключения к серверу по api;
- options: RequestInit - предназначено для хранения настроек подключения по api;
Методы класса:
- get<T>(uri: string) - предназначен для выполнения get-запроса к серверу;
- post<T>(uri: string, data: object, method: ApiPostMethods = 'POST') - предназначен для выполнения всех остальных разрешенных типов запросов к серверу. Разрешенные типы запросов к серверу описываются типом ApiPostMethods.
- handleResponse<T>(response: Response): Promise<T> - метод предназначен для обработки ответа сервера на запрос.

Разрешенные типы запросов к серверу:
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

Основным классом для обмена данными с сервером является класс LarekApi, который расширяется базовым классом API.
Конструктор принимает и передает в родительский конструктор Api поля baseUrl и options.
Поля класса:
- getProduct(id: string) - предназначен для get-запроса информации об одном товаре по его id;
- getProducts() - предназначен для get-запроса массива всех объектов товаров;
- orderProducts(order: OrderRequest) - предназначен для post-запроса для отправки данных оформленного заказа на сервер;

В качестве брокера событий используется класс EventEmitter в классической реализации. Методы класса позволяют: установить обработчик на событие, снять обработчик с события, инициировать событие с данными, слушать все события, сбросить все обработчики, сделать коллбек триггер, генерирующий событие при вызове.

## Отображения
Абстрактный класс Component<T> предназначен для работы с DOM в дочерних компонентах. Конструктор класса принимает контейнер с html-элементом над которым методы класса выполняют действия.
Методы класса:
- toggleClass(element: HTMLElement, className: string, force?: boolean) - предназначен для переключения класса;
- setText(element: HTMLElement, value: unknown) - устанавливает текстовое содержимое html-элементу;
- setDisabled(element: HTMLElement, state: boolean) - предназначен для смены статуса блокировкиж
- setHidden(element: HTMLElement) - предназначен для управления видимостью элемента, скрывает элемент;
- setVisible(element: HTMLElement) - предназначен для управления видимостью элемента, делает элемент видимым;
- setImage(element: HTMLImageElement, src: string, alt?: string) - предназначен для установки изображения с алтированным текстом;
-  render(data?: Partial<T>) - метод возвращает корневой DOM-элемент.

Класс отображения главной страницы Page расширяется классом Component по интерфейсу IPage. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- productsContainer: HTMLElement - родительский элемент верстки, содержащий список товаров;
- numberProducts: HTMLElement - элемент верстки, текст которого показывает количество товаров в корзине.
- basketButton: HTMLButtonElement - элемент верстки корзины в header, кликом по которому открывается модальное окно корзины, на него установлен сигнализатор события брокера событий.
Методы класса:
- set productList(items: HTMLElement[]) - устанавливает список товаров;
- set counterBasket(value: number) - устанавливает количество товаров в корзине.

Для отображения карточки товара в списке товаров на главной странице написан класс Card, который расширяется классом Component по интерфейсу ICard. Конструктор класса принимает родительский HTML-элемент container и объект события events.
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

Класс отображения главной страницы Modal расширяется классом Component по интерфейсу IModal. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- contentContainer: HTMLElement - родительский элемент верстки, содержащий контент модального окна;
- closeButton: HTMLButtonElement - элемент верстки кнопки закрытия модального окна, кликом по которому закрывается модальное окно, на него установлен сигнализатор события брокера событий.
Методы класса:
- contentModal(data: HTMLElement) - предназначен для установки DOM-узла с контентом модального окна.

Класс отображения карточки товара в модальном окне CardPreview расширяется классом Card по интерфейсу IProduct. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- categoryItem: HTMLElement - переопределяет элемент верстки родительского класса,  содержит название категории товара;
- textItem: HTMLElement - элемент верстки, текст которого это описание товара;
- inBasketButton: HTMLButtonElement - элемент верстки кнопки "В корзину", кликом по которой товар добавляется в корзину, модальное окно закрывается, на него установлен сигнализатор события брокера событий.
Методы класса:
- description(value: string) - устанавливает описание товара в окне превью.

Класс отображения корзины в модальном окне Basket расширяется классом Component по  интерфейсу IBasket. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- productsContainer: HTMLElement - родительский элемент верстки, содержащий список товаров;
- totalOrder: HTMLElement - элемент верстки, текст которого показывает полную стоимость товаров в корзине.
- placeOrderButton: HTMLButtonElement - элемент верстки кнопки "Оформить заказ", кликом по которой запускается процесс оформления заказа, на него установлен сигнализатор события брокера событий.
Методы класса:
- productArray(items: HTMLElement[]) - устанавливает список товаров в корзине;
- total(value: number) - устанавливает полную стоимость товаров в корзине.

Класс отображения карточки товара в списке товаров в корзине CardBasket расширяется классом Card по интерфейсу ICardBasket. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- itemIndex: HTMLElement - элемент верстки, текст которого это порядковый номер товара в списке корзины;
- deleteButton: HTMLButtonElement - элемент верстки кнопки "Удалить", кликом по которой товар удаляется из корзины, на него установлен сигнализатор события брокера событий.
Методы класса:
- indexItem(value: number) - устанавливает порядковый номер товара в списке товаров корзины.

Класс отображения формы настроек заказа(способ оплаты и адресс) SettingsOrder расширяется классом Component по  интерфейсу ISettingsOrder. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- formElement: HTMLFormElement - элемент верстки, форма;
- paymentOnlineButton: HTMLButtonElement - элемент верстки кнопки выбора онлайн-оплаты, на него установлен сигнализатор события брокера событий;
- paymentReceiptButton: HTMLButtonElement - элемент верстки кнопки выбора оплаты при получении, на него установлен сигнализатор события брокера событий;
- addressInput: HTMLInputElement - элемент верстки поля ввода адреса доставки, на него установлен сигнализатор события брокера событий;
- nextButton: HTMLButtonElement - элемент верстки кнопки продолжения оформления звказа, на него установлен сигнализатор события брокера событий.
Методы класса:
- address(data: string) - устанавливает адрес в поле ввода адреса доставки;
- payment(data: string) - устанавливает ранее выбранный способ оплаты, выделяет его.

Класс отображения формы настроек заказа(контакты юзера) UserInfo расширяется классом Component по  интерфейсу IUserInfo. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- formElement: HTMLFormElement - элемент верстки, форма;
- emailInput: HTMLInputElement - элемент верстки поля ввода email, на него установлен сигнализатор события брокера событий;
- phoneInput: HTMLInputElement - элемент верстки поля ввода телефона, на него установлен сигнализатор события брокера событий;
- nextButton: HTMLButtonElement - элемент верстки кнопки продолжения оформления звказа, на него установлен сигнализатор события брокера событий.
Методы класса:
- email(data: string) - устанавливает email в поле ввода email;
- phone(data: string) -устанавливает телефон в поле ввода телефона.

Класс отображения финишной страницы SuccessPage расширяется классом Component по  интерфейсу ISuccessPage. Конструктор класса принимает родительский HTML-элемент container и объект события events.
Поля класса:
- totalOrder: HTMLElement - элемент верстки, текст которого показывает полную стоимость заказа.
- nextButton: HTMLButtonElement - элемент верстки кнопки, кликом по которому закрывается модальное окно, на него установлен сигнализатор события брокера событий.


