import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public userProducts: Array<IProductResponse> = [];
  public slide = 0;
  public count = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
    setInterval(() => {
      this.slider();
    }, 10000);
  }
  getProducts(): void {
    this.productService.getAll().subscribe((data) => {
      this.userProducts = data;
    });
  }
  slider(): void {
    if (this.slide == -2640) {
      this.slide = 0;
      this.count = 1;
    } else {
      this.slide = this.slide - 660;
      this.count += 1;
    }
  }
}
