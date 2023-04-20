import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.scss'],
})
export class AuthAdminComponent {
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
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
  }

  loginAdmin(): void {
    const { email, password } = this.loginForm.value;
    this.login(email, password)
      .then(() => {
        this.toastr.success('Admin successfully login');
        this.loginForm.reset();
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
        if (user && user['role'] === ROLE.ADMIN) {
          this.router.navigate(['/admin']);
        }
      },
      (e) => {
        this.toastr.error(e.message);
      }
    );
  }
}
