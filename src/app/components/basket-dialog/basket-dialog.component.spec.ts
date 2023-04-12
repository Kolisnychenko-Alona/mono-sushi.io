import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketDialogComponent } from './basket-dialog.component';

describe('BasketDialogComponent', () => {
  let component: BasketDialogComponent;
  let fixture: ComponentFixture<BasketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketDialogComponent);
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
          id: 2,
        },
        name: 'name',
        path: 'path',
        description: 'description',
        weight: 10,
        price: 10,
        imagePath: 'path',
        count: 2,
        id: 1,
      },
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

  it('should load basket from local storage', () => {
    localStorage.clear();
    spyOn(component, 'loadBasket').and.callThrough();
    component.loadBasket();
    expect(component.loadBasket).toHaveBeenCalled();
    expect(component.empty).toBe(true);
    const FAKE_BASKET = [
      {
        category: {
          name: 'name',
          path: 'path',
          imagePath: 'image',
          id: 2,
        },
        name: 'name',
        path: 'path',
        description: 'description',
        weight: 10,
        price: 10,
        imagePath: 'path',
        count: 2,
        id: 1,
      },
    ];
    localStorage.setItem('basket', JSON.stringify(FAKE_BASKET));
    component.loadBasket();
    expect(component.loadBasket).toHaveBeenCalled();
    expect(component.empty).toBe(false);
    expect(component.basket).toEqual(FAKE_BASKET);
    expect(component.basketProducts).toEqual(FAKE_BASKET);
    localStorage.clear();
  });
});
