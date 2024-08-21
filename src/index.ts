import { ProductModel, OrderModel } from './components/models';
import './scss/styles.scss';

const productModel = new ProductModel();
const orderModel = new OrderModel();

productModel.addProduct({
    id: "854cef69-976d-4c2a-a18c-2aa45046c390",
    description: "Если планируете решать задачи в тренажёре, берите два.",
    image: "/5_Dots.svg",
    title: "+1 час в сутках",
    category: "софт-скил",
    price: 750
})

console.log(productModel.getProductsList());

console.log(productModel.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390"));

productModel.setProductsList([
    {
        id: "854cef69-976d-4c2a-a18c-2aa45046c391",
        description: "Если планируете решать.",
        image: "/5_Dots.svg",
        title: "+1 час в сутках",
        category: "софт-скил",
        price: 750
    },
    {
        id: "854cef69-976d-4c2a-a18c-2aa45046c392",
        description: "задачи в тренажёре,",
        image: "/5_Dots.svg",
        title: "+1 час в сутках",
        category: "софт-скил",
        price: 750
    },
    {
        id: "854cef69-976d-4c2a-a18c-2aa45046c393",
        description: "берите два.",
        image: "/5_Dots.svg",
        title: "+1 час в сутках",
        category: "софт-скил",
        price: 750
    }
])

console.log(productModel.getProductsList());

orderModel.addOrder({
    id: "28c57cb4-3002-4445-8aa1-2a06a5055ae5",
    payment: "online",
    email: "test@test.ru",
    phone: "+71234567890",
    address: "Spb Vosstania 1",
    items: ["854cef69-976d-4c2a-a18c-2aa45046c390", "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"]
});

console.log(orderModel.getOrder("28c57cb4-3002-4445-8aa1-2a06a5055ae5"))