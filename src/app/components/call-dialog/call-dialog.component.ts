import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringLength } from '@firebase/util';

@Component({
  selector: 'app-call-dialog',
  templateUrl: './call-dialog.component.html',
  styleUrls: ['./call-dialog.component.scss'],
})
export class CallDialogComponent {
  public isCallDialog = false;
  public callBackForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initCallBackForm();
  }
  initCallBackForm(): void {
    this.callBackForm = this.fb.group({
      name: [null, Validators.required],
      phone: [null, [Validators.required]]
    });
  }
  callBack(): void { };
}
