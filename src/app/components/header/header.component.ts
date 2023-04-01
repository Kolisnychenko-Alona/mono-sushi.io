import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { CallDialogComponent } from '../call-dialog/call-dialog.component';

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

  public isUser = false;
  public isAdmin = false;
  public isList = false;
  public userName = '';

  public userCategories: Array<ICategoryResponse> = [];
  private basket: Array<IProductResponse> = [];
  public total = 0;

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,

    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.loadBasket();
    this.updateBasket();
    this.checkLogin();
    this.checkUpdatesLogin();
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

  checkLogin(): void {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    if (currentUser && currentUser.role === ROLE.USER) {
      this.isUser = true;
      this.userName = currentUser.firstName + ' ' + currentUser.lastName;
    } else if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isAdmin = true;
      this.userName = currentUser.firstName + ' ' + currentUser.lastName;
    } else {
      this.isUser = false;
      this.isAdmin = false;
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
    this.isUser = false;
    this.isList = false;
  }

  openLoginDialog(): void {
    this.isLogin = !this.isLogin;
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false,
    });
  }
  openBasket(): void {
    this.basketIsOpen = true;
    this.dialog
      .open(BasketDialogComponent, {
        backdropClass: 'dialog-basket-back',
        panelClass: 'basket-dialog',
        position: { top: '90px', right: '0px' },
      })
      .afterClosed()
      .subscribe(() => {
        this.basketIsOpen = false;
      });
  }
  closeBasket(): void {
    this.dialog.closeAll();
  }

  openCallBackDialog(): void {
    this.dialog.open(CallDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'call-dialog',
    });
  }
}
