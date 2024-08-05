import { IProduct, OrderRequest, OrderResponse } from "../types";
import { Api } from "./base/api";

export class LarekApi extends Api {

    constructor(baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
    }

    getProduct(id: string): Promise<IProduct> {
        return this.get<IProduct>(`/product/${id}`);
    };

    getProducts(): Promise<IProduct[]> {
        return this.get<IProduct[]>(`/product/`);
    };

    orderProducts(order: OrderRequest): Promise<OrderResponse> {
        return this.post<OrderResponse>(`/order`, order, 'POST');
    };
}