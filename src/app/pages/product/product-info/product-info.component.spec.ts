import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductInfoComponent);
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
        id: 2,
      },
      name: 'name',
      path: 'path',
      description: 'description',
      weight: 10,
      price: 10,
      imagePath: 'image',
      count: 5,
      id: 1,
    };
    let value = true;
    spyOn(component, 'productCount').and.callThrough();
    component.productCount(PRODUCT, value);
    expect(component.productCount).toHaveBeenCalled();
    expect(PRODUCT.count).toBe(6);
    value = false;
    component.productCount(PRODUCT, value);
    expect(component.productCount).toHaveBeenCalled();
    expect(PRODUCT.count).toBe(5);
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
