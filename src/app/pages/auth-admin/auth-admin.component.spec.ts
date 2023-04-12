import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAdminComponent } from './auth-admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('AuthAdminComponent', () => {
  let component: AuthAdminComponent;
  let fixture: ComponentFixture<AuthAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthAdminComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init auth admin form', () => {
    expect(component.loginForm.value).toEqual({ email: null, password: null });
  });
});
