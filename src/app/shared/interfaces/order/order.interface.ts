import { IProductRequest } from "../product/product.interface";

export interface IOrderRequest {
  basket: Array<IProductRequest>,
  cutleryCount: number,
  holdersCount: number,
  payment: string,
  delivery: string,
  name: string,
  phone: number,
  street?: string,
  houseNumber?: number,
  entrance?: string,
  flat?: number,
  address?: string
}

export interface IOrderResponse extends IOrderRequest {
  id: string;
}
