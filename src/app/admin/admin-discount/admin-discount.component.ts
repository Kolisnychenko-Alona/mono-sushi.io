import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/IDiscount';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss'],
})
export class AdminDiscountComponent implements OnInit {
  public isDown = false;
  public isAdding = false;
  public editStatus = false;
  private currentDiscountId = 0;
  public discountForm!: FormGroup;
  public date = new Date();
  public isUploaded = false;

  public adminDiscounts: Array<IDiscountResponse> = [];

  constructor(
    private discountService: DiscountService,
    private imageService: ImageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getDiscounts();
    this.initDiscountForm();
  }

  down(): void {
    this.isDown = true;
  }
  up(): void {
    this.isDown = false;
  }
  add(): void {
    this.isAdding = !this.isAdding;
    this.editStatus = false;
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      text: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }

  getDiscounts(): void {
    this.discountService.getAll().subscribe((data) => {
      this.adminDiscounts = data;
    });
  }

  saveDiscount(): void {
    if (this.editStatus) {
      this.discountService
        .update(this.discountForm.value, this.currentDiscountId)
        .subscribe(() => {
          this.getDiscounts();
        });
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.getDiscounts();
      });
    }
    this.discountForm.reset();
    this.isAdding = !this.isAdding;
    this.editStatus = false;
    this.isUploaded = false;
  }

  editDiscount(discount: IDiscountResponse): void {
    this.editStatus = true;
    this.isAdding = true;
    this.isUploaded = true;
    this.discountForm.patchValue({
      name: discount.name,
      title: discount.title,
      text: discount.text,
      imagePath: discount.imagePath,
    });
    this.currentDiscountId = discount.id;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.delete(discount.id).subscribe(() => {
      this.getDiscounts();
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService
      .uploadFile('images/discounts', file.name, file)
      .then((data) => {
        this.isUploaded = true;
        this.discountForm.patchValue({
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
        this.discountForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }
  isControlInvalid(controlName: string): boolean {
    const control = this.discountForm.controls[controlName];
    const result = control.invalid && control.touched;
    return result;
  }
}
