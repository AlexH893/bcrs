import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/user.interface';
import { SecurityQuestion } from '../../models/security-question.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AccountRegistrationComponent implements OnInit {
  securityQuestion: SecurityQuestion;
  contactForm = new FormGroup({
    firstName: new FormControl(),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  register() {
    const contactInformation = this.contactForm.value;

    this.http
      .post('/api/session/register', {
        firstName: contactInformation.firstName,
      })
      .subscribe((res) => {
        this.router.navigate(['sign-in']);
      });
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
    });
  }
}
