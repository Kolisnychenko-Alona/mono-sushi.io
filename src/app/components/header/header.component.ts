import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
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
  public isLogin = false;
  public loginForm!: FormGroup;
  public isAdmin = false;
  public isUser = false;
  public isList = false;

  public userCategories: Array<ICategoryResponse> = [];
  private basket: Array<IProductResponse> = [];
  public total = 0;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.loadBasket();
    this.updateBasket();
    this.initForm();
    this.checkLogin();
    this.checkUpdatesLogin();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
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

  openBasket(): void {
    this.basketIsOpen = !this.basketIsOpen;
  }

  logIn(): void {
    this.accountService.login(this.loginForm.value).subscribe(
      (data) => {
        if (data && data.length > 0) {
          const user = data[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.accountService.isLogin$.next(true);
          if (user && user.role === ROLE.USER) {
            this.router.navigate(['/cabinet']);
          } else if (user && user.role === ROLE.ADMIN) {
            this.router.navigate(['/admin']);
          }
          this.isLogin = false;
        }
      },
      (e) => {
        console.log(e);
      }
    );
  }

  checkLogin(): void {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    if (currentUser && currentUser.role === ROLE.USER) {
      this.isUser = true;
    } else if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
      this.isUser = false;
    }
  }

  checkUpdatesLogin() {
    this.accountService.isLogin$.subscribe(() => {
      this.checkLogin();
    });
  }

  logOut(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isLogin$.next(true);
  }
}
