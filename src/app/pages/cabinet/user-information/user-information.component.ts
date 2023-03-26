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
    this.personalForm = this.fb.group({
      firstName: [currentUser.firstName, Validators.required],
      lastName: [currentUser.lastName, Validators.required],
      phone: [currentUser.phone, Validators.required],
      email: [currentUser.email, Validators.required],
    });
  }

  addAddress(): void {}
  saveChanges(): void { 
    
  };

  ngOnInit(): void {
    this.initForm();
  }
}
