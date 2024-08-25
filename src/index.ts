import { ProductModel, OrderModel } from './components/models';
import { api } from './components/larekApi';
import { EventEmitter } from './components/base/events';
import { Card, Page } from './components/views';
import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';
import { CDN_URL } from  "./utils/constants"


const events = new EventEmitter();
const productModel = new ProductModel(events);
const orderModel = new OrderModel();
const page = new Page(ensureElement('.page'), events);
const card = new Card(cloneTemplate('#card-catalog'), events);
const te = ensureElement('.gallery');
const aa = card.render({
  "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
  "image": `${CDN_URL}/5_Dots.svg`,
  "title": "+1 час в сутках",
  "category": "софт-скил",
  "price": 750
})
te.append(aa);

api
  .getProducts()
  .then((data) => {
    productModel.setProductsList(data);
  })
  .catch((err) => console.log(err));


events.on('product_items:set_items', () => {
  console.log(productModel.getProductsList());
})

page.render(
  {
    counterBasket: 20
}
)