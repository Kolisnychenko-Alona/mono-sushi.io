export interface IDiscountRequest {
  name: string;
  title: string;
  text: string;
  imagePath: string;
}

export interface IDiscountResponse extends IDiscountRequest{
  id: number;
}
