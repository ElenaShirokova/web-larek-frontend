import { ProductModel, OrderModel } from './components/models';
import { api } from './components/larekApi';
import './scss/styles.scss';

const productModel = new ProductModel();
const orderModel = new OrderModel();


api
  .getProducts()
  .then((data) => {
    productModel.setProductsList(data);
    console.log(productModel.getProductsList());
  })
  .catch((err) => console.log(err));

