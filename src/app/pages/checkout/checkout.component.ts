import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public basket: Array<IProductResponse> = [];
  public basketProducts: Array<IProductResponse> = [];
  public total = 0;
  public empty = true;
  public orderDone = false;
  public orderForm!: FormGroup;
  public deliveryType = "доставка";

  constructor(private orderService: OrderService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initForm();
  }

  initForm(): void {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    if (currentUser) {
      let user = currentUser;
      this.orderForm = this.fb.group({
        basket: [this.basketProducts, Validators.required],
        cutleryCount: [null, Validators.required],
        holdersCount: [null, Validators.required],
        payment: ['готівка', Validators.required],
        delivery: ['доставка', Validators.required],
        name: [user.firstName, Validators.required],
        phone: [user.phone, Validators.required],
        street: [null, Validators.required],
        houseNumber: [null, Validators.required],
        entrance: [null],
        flat: [null],
        address: [null],
      });
    } else {
      this.orderForm = this.fb.group({
        basket: [this.basketProducts, Validators.required],
        cutleryCount: [null, Validators.required],
        holdersCount: [null, Validators.required],
        payment: ['готівка', Validators.required],
        delivery: ['доставка', Validators.required],
        name: [null, Validators.required],
        phone: [null, Validators.required],
        street: [null, Validators.required],
        houseNumber: [null, Validators.required],
        entrance: [null],
        flat: [null],
        address: [null],
      });
    }
    
    this.orderForm.get('delivery')?.valueChanges.subscribe((deliveryType) => {
      if (deliveryType === 'доставка') {
        this.orderForm.get('street')?.setValidators([Validators.required]);
        this.orderForm.get('houseNumber')?.setValidators([Validators.required]);
        this.orderForm.get('address')?.clearValidators();
      } else if (deliveryType === 'самовивіз') {
        this.orderForm.get('street')?.clearValidators();
        this.orderForm.get('houseNumber')?.clearValidators();
        this.orderForm.get('address')?.setValidators([Validators.required]);
      }

      this.orderForm.get('street')?.updateValueAndValidity();
      this.orderForm.get('houseNumber')?.updateValueAndValidity();
      this.orderForm.get('address')?.updateValueAndValidity();
    });
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
        total + prod.count * prod.price, 0 );
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
      } else if (index === basket.length - 1) {
        basket.pop();
      } else {
        basket.splice(1, index);
      }
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.orderService.changeBasket.next(true);
  }

  changeDelivery(): void {
    this.deliveryType = this.orderForm.get('delivery')?.value;
  }

  confirmOrder(): void {
    this.orderService.create(this.orderForm.value).then(() => {
      localStorage.removeItem('basket');
      this.orderService.changeBasket.next(true);
      this.orderDone = !this.orderDone;
    });
  }

  toHome(): void {
    this.orderDone = !this.orderDone;
  }
}
