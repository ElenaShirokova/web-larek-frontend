import { IProduct, OrderRequest, OrderResponse } from "../types";
import { Api } from "./base/api";
import { API_URL } from  "../utils/constants"

export class LarekApi extends Api {

    constructor(baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
    }

    getProduct(id: string): Promise<IProduct> {
        return this.get<IProduct>(`/product/${id}`);
    };

    getProducts(): Promise<IProduct[]> {
        return this.get<IProduct[]>('/product/');
    };

    orderProducts(order: OrderRequest): Promise<OrderResponse> {
        return this.post<OrderResponse>(`/order`, order, 'POST');
    };
}

export const api = new LarekApi(API_URL);