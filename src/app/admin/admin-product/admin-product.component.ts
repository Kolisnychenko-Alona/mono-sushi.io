import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
})
export class AdminProductComponent implements OnInit {
  public isDown = false;
  public isAdding = false;
  public adminCategories: Array<ICategoryResponse> = [];
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup;
  public editStatus = false;
  private currentProductId!: string;
  public isUploaded = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private fb: FormBuilder,
    private imageService: ImageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initProductForm(), this.getCategories(), this.getProducts();
  }
  down(): void {
    this.isDown = true;
  }
  up(): void {
    this.isDown = false;
  }
  add(): void {
    this.editStatus = false;
    this.isAdding = !this.isAdding;
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1],
    });
  }

  getCategories(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategories = data as ICategoryResponse[];
    });
  }
  getProducts(): void {
    this.productService.getAll().subscribe((data) => {
      this.adminProducts = data as IProductResponse[];
    });
  }
  saveProduct(): void {
    if (this.editStatus) {
      this.productService
        .update(this.productForm.value, this.currentProductId)
        .then(() => {
          this.getProducts();
          this.toastr.success('Product successfully updated');
        });
    } else {
      this.productService.create(this.productForm.value).then(() => {
        this.getProducts();
        this.toastr.success('Product successfully created');
      });
    }
    this.editStatus = false;
    this.productForm.reset();
    this.isAdding = !this.isAdding;
    this.isUploaded = false;
  }
  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
    });
    this.editStatus = true;
    this.isUploaded = true;
    this.isAdding = true;
    this.currentProductId = product.id;
  }
  deleteProduct(product: IProductResponse): void {
    this.productService.delete(product.id).then(() => {
      this.getProducts();
      this.toastr.success('Product successfully deleted');
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('images/products', file.name, file)
      .then((data) => {
        this.isUploaded = true;
        this.productForm.patchValue({ imagePath: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteImage(): void {
    this.imageService
      .deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        console.log('File deleted');
        this.isUploaded = false;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.productForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
}
