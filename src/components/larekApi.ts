import { OrderRequest, OrderResponse, IProductItem, IProductList } from "../types";
import { Api } from "./base/api";
import { API_URL } from  "../utils/constants"

export class LarekApi extends Api {

    constructor(baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
    }

    getProduct(id: string): Promise<IProductItem> {
        return this.get<IProductItem>(`/product/${id}`);
    };

    getProducts(): Promise<IProductList> {
        return this.get<IProductList>('/product/');
    };

    orderProducts(order: OrderRequest): Promise<OrderResponse> {
        return this.post<OrderResponse>(`/order`, order, 'POST');
    };
}

export const api = new LarekApi(API_URL);
