import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isBurger = false;

  public userCategories: Array<ICategoryResponse> = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  burger(): void {
    this.isBurger = !this.isBurger;
  }

  getCategories(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.userCategories = data;
    });
  }
}
