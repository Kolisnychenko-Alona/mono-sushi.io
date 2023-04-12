import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  public product!: IProductResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  )
  { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.product = response['productInfo'];
    })
    this.isEmpty();
  }
  isEmpty(): void{
    if (!this.product) {
      this.product = {
        category: {
          name: 'name',
          path: 'path',
          imagePath: 'image',
          id: 1
        },
        name: 'name',
        path: 'path',
        description: 'description',
        weight: 1,
        price: 1,
        imagePath: 'image',
        count: 1,
        id: 0
      }
    }
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void{
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count
      } else {
        basket.push(product);
      }
    } else{ basket.push(product);}  
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }
  
}
