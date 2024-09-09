import { ProductModel, OrderModel } from './components/models';
import { api } from './components/larekApi';
import { EventEmitter } from './components/base/events';
import { Card, Page, Modal, CardPreview, CardBasket, Basket, SettingsOrder, UserInfo, SuccessPage } from './components/views';
import './scss/styles.scss';
import { cloneTemplate, ensureElement } from './utils/utils';
import { PaymentElement } from './types/index'


// экземпляры классов
const events = new EventEmitter();
const productModel = new ProductModel(events);
const orderModel = new OrderModel(events);
const page = new Page(ensureElement('.page'), events);
const modal = new Modal(ensureElement('#modal-container'), events);
const cardPreview = new CardPreview(cloneTemplate('#card-preview'), events);
const basket = new Basket(cloneTemplate('#basket'), events);
const orderSettings = new SettingsOrder(cloneTemplate('#order'), events);
const userInfo = new UserInfo(cloneTemplate('#contacts'), events);
const succesPage = new SuccessPage(cloneTemplate('#success'), events);

// константы
const cardTemplate = ensureElement('#card-catalog') as HTMLTemplateElement;
const cardBasketTemplate = ensureElement('#card-basket') as HTMLTemplateElement;


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

// отрисовать количество товара в корзине в шапке страницы
events.on('order_items:change_order', () => {
  const counter = orderModel.getCounter();
  page.render(
    {
      counterBasket: counter
    }
  )
})

// открыть модальное окно карточки товара
events.on('card:click', ({id}: {id: string}) => {
  modal.open();
  const objProduct = productModel.getProduct(id)
  const cardHTML = cardPreview.render(objProduct);
  modal.render({
    contentModal: cardHTML
  })
  const arrBasket = orderModel.getArrIdProduct();
  if (arrBasket.includes(id)) {
    cardPreview.buttonText('Из корзины');
  } else {
    cardPreview.buttonText('В корзину');
  }
})

// добавить/удалить товар из корзины через карточку товара
events.on('inBasket:click', ({id}: {id: string}) => {
  const arrBasket = orderModel.getArrIdProduct();
  if (arrBasket.includes(id)) {
    orderModel.removeProduct(id);
    cardPreview.buttonText('В корзину');
  } else {
    orderModel.addProduct(id);
    cardPreview.buttonText('Из корзины');
  }
})

// функция отрисовки содержимого корзины
function renderBasket() {
  const itemsOrder = orderModel.getArrIdProduct();
  const itemsHTMLArray =  productModel.getProductsArr(itemsOrder).map((item, index) => {
    return new CardBasket(cloneTemplate(cardBasketTemplate), events).render(
      {
        title: item.title,
        price: item.price,
        indexItem: index + 1,
        id: item.id
      }
    )
  });
  const totalBasket = productModel.getTotalBasket(itemsOrder);
  let isValid;
  if (totalBasket === 0) {
    isValid = false;
  } else {
    isValid = true;
  }
  const basketHTML = basket.render({
    productArray: itemsHTMLArray,
    total: totalBasket,
    valid: isValid
  });
  modal.render({
    contentModal: basketHTML
  })
}

// открыть модальное окно корзины
events.on('basketIcon:click', () => {
  modal.open();
  renderBasket();
})

// удалить товар из корзины
events.on('deleteProduct:click', ({id}: {id: string}) => {
  orderModel.removeProduct(id);
  renderBasket();
})

// функция отрисовки формы выбора способа оплаты и ввода адреса доставки
function renderSettingsOrder() {
  const payment = orderModel.getOrderPayment();
  const address = orderModel.getOrderAddress();
  let error = '';
  let isValid = false;
  if (payment === '') {
    error = 'Выберите способ оплаты';
  } else if (address === '') {
    error = 'Введите адрес доставки заказа';
  } else {
    isValid = true;
  };
  const orderHTML = orderSettings.render({
    address: address,
    payment: payment,
    error: error,
    valid: isValid
  });
  modal.render({
    contentModal: orderHTML
  })
};

// открыть форму выбора способа оплаты и ввода адреса доставки
events.on('placeOrder:click', () => {
  renderSettingsOrder();
});

// выбор способа оплаты заказа
events.on('payment:click', ({paymentOrder}: {paymentOrder: PaymentElement}) => {
  orderModel.editOrder({payment: paymentOrder});
  renderSettingsOrder();
});

// ввод адреса доставки
events.on('inputAddress:change', ({value}: {value: string}) => {
  orderModel.editOrder({address: value});
  renderSettingsOrder();
});


// функция отрисовки формы ввода данных пользователя
function renderUserInfo() {
  const email = orderModel.getOrderEmail();
  const phone = orderModel.getOrderPhone();
  let error = '';
  let isValid = false;
  if (email === '') {
    error = 'Введите email';
  } else if (phone === '') {
    error = 'Введите телефон';
  } else {
    isValid = true;
  };
  const userInfoHTML = userInfo.render({
    email: email,
    phone: phone,
    error: error,
    valid: isValid
  });
  modal.render({
    contentModal: userInfoHTML
  })
};

// открыть форму ввода данных покупателя
events.on('settingsNext:click', () => {
  renderUserInfo();
});

// ввод email
events.on('inputEmail:change', ({value}: {value: string}) => {
  orderModel.editOrder({email: value});
  renderUserInfo();
});

// ввод телефона
events.on('inputPhone:change', ({value}: {value: string}) => {
  orderModel.editOrder({phone: value});
  renderUserInfo();
});

// открыть итоговую форму
events.on('userInfoNext:click', () => {
  const itemsOrder = orderModel.getArrIdProduct();
  const itemsOrderNotNull = productModel.getProductsArrNotNull(itemsOrder);
  const totalBasket = productModel.getTotalBasket(itemsOrderNotNull);
  orderModel.editOrder({items: itemsOrderNotNull});
  const objOrder = orderModel.getOrder();
  api
    .orderProducts({
      payment: objOrder.payment,
      email: objOrder.email,
      phone: objOrder.phone,
      address: objOrder.address,
      total: totalBasket,
      items: objOrder.items
    })
    .then((data) => {
      const succesHTML = succesPage.render({
        total: data.total
      })
      modal.render({
        contentModal: succesHTML
      })
      orderModel.editOrder({
        payment: '',
        email: '',
        phone: '',
        address: '',
        items: []
      });
    })
    .catch((err) => console.log(err));
});

//вернуться к покупкам
events.on('success:click', () => {
  modal.close();
  const itemsHTMLArray =  productModel.getProductsList().map(item => new Card(cloneTemplate(cardTemplate), events).render(item));
  const counter = orderModel.getCounter();
  page.render(
    {
      productList: itemsHTMLArray,
      counterBasket: counter
    }
  );
});
