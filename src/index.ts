import { ProductModel, OrderModel } from './components/models';
import { api } from './components/larekApi';
import { EventEmitter } from './components/base/events';
import { Card, Page, Modal, CardPreview } from './components/views';
import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CDN_URL } from  "./utils/constants"


// экземпляры классов
const events = new EventEmitter();
const productModel = new ProductModel(events);
const orderModel = new OrderModel(events);
const page = new Page(ensureElement('.page'), events);
const card = new Card(cloneTemplate('#card-catalog'), events);
const modal = new Modal(ensureElement('#modal-container'), events);
const cardPreview = new CardPreview(cloneTemplate('#card-preview'), events);

// константы
const cardTemplate = ensureElement('#card-catalog') as HTMLTemplateElement;


// получение карточек с сервера
api
  .getProducts()
  .then((data) => {
    productModel.setProductsList(data.items);
  })
  .catch((err) => console.log(err));

// вывод списка карточек на главной странице
events.on('product_items:set_items', () => {
  const itemsHTMLArray =  productModel.getProductsList().map(item => new Card(cloneTemplate(cardTemplate), events).render(item));
  page.render(
    {
      productList: itemsHTMLArray,
    }
  )
})

// открыть модальное окно карточки товара
events.on('card:click', (data: {_id: string}) => {
  modal.open();
  const { _id } = data;
  const objProduct = productModel.getProduct(_id);
  const cardHTML = cardPreview.render(objProduct);
  modal.render({
    contentModal: cardHTML
  })
})


// отрисовать количество товара в корзине в шапке страницы
events.on('order_items:add_item', (data: {_id: string}) => {
  const { _id } = data;
  const counter = orderModel.getCounter(_id);
  page.render(
    {
      counterBasket: counter
    }
  )
})

