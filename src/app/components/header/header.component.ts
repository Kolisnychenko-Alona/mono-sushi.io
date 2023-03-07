import { Component, HostListener, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isBurger = false;
  public scroll = false;
  public basketIsOpen = false;

  public userCategories: Array<ICategoryResponse> = [];
  private basket: Array<IProductResponse> = [];
  public total = 0;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.loadBasket();
    this.updateBasket();
  }

  burger(): void {
    this.isBurger = !this.isBurger;
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
  }

  getCategories(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.userCategories = data;
    });
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY <= 0) {
      this.scroll = false;
    } else {
      this.scroll = true;
    }
  }

  openBasket(): void{
    this.basketIsOpen = !this.basketIsOpen;
  }
}
