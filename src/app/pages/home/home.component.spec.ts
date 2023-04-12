import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change product count', () => {
    const PRODUCT = {
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
      imagePath: 'image',
      count: 5,
      id: 1
    };
    let value = true
    spyOn(component, 'productCount').and.callThrough();
    component.productCount(PRODUCT, value);
    expect(component.productCount).toHaveBeenCalled();
    expect(PRODUCT.count).toBe(6);
    value = false;
    component.productCount(PRODUCT, value);
    expect(component.productCount).toHaveBeenCalled();
    expect(PRODUCT.count).toBe(5);
  });

  it('should change slide and count', () => {
    component.slide = -2640;
    spyOn(component, 'slider').and.callThrough();
    component.slider();
    expect(component.slider).toHaveBeenCalled();
    expect(component.slide).toBe(0);
    expect(component.count).toBe(1);
  });
  it('should add product to basket', () => {
    const PRODUCT = {
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
      imagePath: 'image',
      count: 0,
      id: 1,
    };
    spyOn(component, 'addToBasket').and.callThrough();
    component.addToBasket(PRODUCT);
    expect(component.addToBasket).toHaveBeenCalled();
    expect(PRODUCT.count).toBe(1);
  });
});
