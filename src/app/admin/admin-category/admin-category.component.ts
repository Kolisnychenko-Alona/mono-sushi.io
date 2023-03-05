import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/ICategory';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  public isDown = false;
  public isAdding = false;
  public editStatus = false;
  private currentCategoryId = 0;
  public categoryForm!: FormGroup;
  public isUploaded = false;

  public adminCategories: Array<ICategoryResponse> = [];

  constructor(
    private categoryService: CategoryService,
    private imageService: ImageService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.initCategoryForm();
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

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  getCategories(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategories = data;
    });
  }

  saveCategory(): void {
    if (this.editStatus) {
      this.categoryService
        .update(this.categoryForm.value, this.currentCategoryId)
        .subscribe(() => {
          this.getCategories();
        });
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.getCategories();
      });
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.isAdding = !this.isAdding;
    this.isUploaded = false;
  }

  editCategory(category: ICategoryResponse): void {
    this.editStatus = true;
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
    });
    this.isUploaded = true;
    this.isAdding = true;
    this.currentCategoryId = category.id;
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.getCategories();
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('images/categories', file.name, file)
      .then((data) => {
        this.isUploaded = true;
        this.categoryForm.patchValue({
          imagePath: data,
        });
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
        this.categoryForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.categoryForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
}
