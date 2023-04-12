import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('It shoud change total', () => {
    const FAKE_BASKET = [
      {
        category: {
          name: 'name',
          path: 'path',
          imagePath: 'image',
          id: 2
        },
        name: 'name',
        path: 'path',
        description: 'description',
        weight: 10,
        price: 10,
        imagePath: 'path',
        count: 2,
        id: 1
      }
    ];
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(20);
    component.basket = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });

  it('should change boolean meaning', () => {
    component.isBurger = true;
    spyOn(component, 'burger').and.callThrough();
    component.burger();
    expect(component.burger).toHaveBeenCalled();
    expect(component.isBurger).toBe(false);
  });

  it('should login user', () => {
    const user1 = {
      email: 'user@gmail.com',
      firstName: 'ivan',
      lastName: 'ivanov',
      phone: 7777777,
      role: 'USER',
      orders: [],
    };
    localStorage.setItem('currentUser', JSON.stringify(user1));
    spyOn(component, 'checkLogin').and.callThrough();
    component.checkLogin();
    expect(component.checkLogin).toHaveBeenCalled();
    expect(component.isUser).toBe(true);
    expect(component.userName).toBe('ivan ivanov');
    expect(component.isAdmin).toBe(false);
    localStorage.clear();
    const user2 = {
      email: 'user@gmail.com',
      firstName: 'pavlo',
      lastName: 'pavliv',
      phone: 7777777,
      role: 'ADMIN',
      orders: [],
    };
    localStorage.setItem('currentUser', JSON.stringify(user2));
    component.checkLogin();
    expect(component.checkLogin).toHaveBeenCalled();
    expect(component.isUser).toBe(false);
    expect(component.userName).toBe('pavlo pavliv');
    expect(component.isAdmin).toBe(true);
    localStorage.clear();

    component.checkLogin();
    expect(component.checkLogin).toHaveBeenCalled();
    expect(component.isUser).toBe(false);
    expect(component.isAdmin).toBe(false);
  });

  it('should login user', () => {
    const user = {
      email: 'user@gmail.com',
      firstName: 'ivan',
      lastName: 'ivanov',
      phone: 7777777,
      role: 'USER',
      orders: [],
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    spyOn(component, 'logOut').and.callThrough();
    component.logOut();
    expect(component.logOut).toHaveBeenCalled();
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string);
    expect(currentUser).toBe(null);
    localStorage.clear();
  });
});
