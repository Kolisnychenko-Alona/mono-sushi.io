import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { setDoc } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ConfirmPassword } from 'src/app/shared/confirm.validator';

export interface IRegister {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  password: string;
  confirmPassword?: string;
}

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnInit {
  public loginForm!: FormGroup;
  public registrationForm!: FormGroup;
  public isLogin = false;
  public registration = false;
  private registrationData!: IRegister;
  // public checkPassword = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
    this.registrationForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [
        null,
        [Validators.required, ConfirmPassword('password')],
      ],
    });
  }

  loginUser(): void {
    const { email, password } = this.loginForm.value;
    this.login(email, password)
      .then(() => {
        this.toastr.success('User successfully login');
        this.loginForm.reset();
        this.dialogRef.close();
      })
      .catch((e) => {
        this.toastr.error(e.message);
      });
  }

  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(
      (user) => {
        const currentUser = { ...user, uid: credential.user.uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.accountService.isLogin$.next(true);
        if (user && user['role'] === ROLE.USER) {
          this.router.navigate(['/cabinet']);
        }
        this.isLogin = false;
      },
      (e) => {
        this.toastr.error(e.message);
      }
    );
  }
  registerUser(): void {
    const { email, password } =
      this.registrationForm.value;
    this.registrationData = this.registrationForm.value;
    this.signUp(email, password)
      .then(() => {
        this.toastr.success('User successfully created');
        this.login(email, password)
          .then(() => {
            this.toastr.success('User successfully login');
            this.dialogRef.close();
          })
          .catch((e) => {
            this.toastr.error(e.message);
          });
        this.registration = false;
        this.registrationForm.reset();
      })
      .catch((e) => {
        this.toastr.error(e.message);
      });
  }

  async signUp( email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = {
      email: credential.user.email,
      firstName: this.registrationData.firstName,
      lastName: this.registrationData.lastName,
      phone: this.registrationData.phone,
      role: 'USER',
      orders: [],
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }
}
