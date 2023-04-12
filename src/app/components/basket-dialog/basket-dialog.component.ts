import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss'],
})
export class BasketDialogComponent implements OnInit {
  public basket: Array<IProductResponse> = [];
  public basketProducts: Array<IProductResponse> = [];
  public total = 0;
  public empty = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.empty = false;
      this.basketProducts = this.basket;
    } else this.empty = true;
    this.getTotalPrice();
  }
  getTotalPrice(): void {
    this.total = this.basket.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
  }
  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }
  productCount(product: IProductResponse, value: boolean): void {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    if (value) {
      ++product.count;
      const index = basket.findIndex((prod) => prod.id === product.id);
      ++basket[index].count;
      localStorage.setItem('basket', JSON.stringify(basket));
      this.orderService.changeBasket.next(true);
    } else if (!value && product.count > 1) {
      --product.count;
      const index = basket.findIndex((prod) => prod.id === product.id);
      --basket[index].count;
      localStorage.setItem('basket', JSON.stringify(basket));
      this.orderService.changeBasket.next(true);
    }
    
  }
  deleteProduct(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some((prod) => prod.id === product.id)) {
        const index = basket.findIndex((prod) => prod.id === product.id);
        if (index === 0) {
          basket.shift();
        } else if (index===basket.length-1) {
          basket.pop();
        }else {
          basket.splice(1, index);
        }
      }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  confirmOrder(): void {
    console.log(this.basket);
  }
}
