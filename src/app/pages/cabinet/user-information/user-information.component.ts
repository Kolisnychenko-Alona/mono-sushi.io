import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent implements OnInit {
  public personalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

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
        email: '@'
      }
    }
    this.personalForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      phone: [user.phone, Validators.required],
      email: [user.email, Validators.required],
    });
  }

  addAddress(): void {}
  saveChanges(): void { 
    
  };

  ngOnInit(): void {
    this.initForm();
  }
}
