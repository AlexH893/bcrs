import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  hide = true;
  form: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null],
    });
  }

  login(): void {
    const userName = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;

    this.http.post('/api/session/sign-in', {userName, password}).subscribe((res: any) => {
      if (res) {

        this.cookieService.set('session_user', userName);
        this.router.navigate(['/']);
      }
    },(error) => alert(error));
  }
}
