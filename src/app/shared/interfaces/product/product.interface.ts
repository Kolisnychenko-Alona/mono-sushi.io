import { ICategoryResponse } from "../category/ICategory";

export interface IProductRequest{
   category: ICategoryResponse;
   name: string;
   path: string;
   description: string;
   weight: number;
   price: number;
   imagePath: string;
}

export interface IProductResponse extends IProductRequest{
   id: number;
}