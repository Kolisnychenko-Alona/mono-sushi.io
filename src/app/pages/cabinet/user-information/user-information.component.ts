import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent implements OnInit {
  public personalForm!: FormGroup;
  public currentUserId!: string;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    let user = currentUser;
    if (!currentUser) {
      user = {
        firstName: 'name',
        lastName: 'name',
        phone: '1',
        email: '@',
      };
    }
    this.currentUserId = user.uid;
    this.personalForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      phone: [user.phone, Validators.required],
      email: [user.email, Validators.required],
    });
  }
  saveChanges(): void {
    console.log(this.currentUserId);
    this.accountService
      .update(this.personalForm.value, this.currentUserId)
      .then(() => {
        this.toastr.success('Changes successfully saved');
      });
  }
}
