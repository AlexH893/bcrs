import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/user.interface';
import { SecurityQuestion } from '../../models/security-question.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

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
  questions: SecurityQuestion[] = [];
  contactForm = new FormGroup({});
  questionsForm = new FormGroup({});
  credentialsForm = new FormGroup({});

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  register() {
    const contactInformation = this.contactForm.value;
    const questionInformation = this.questionsForm.value;
    const credentialsInformation = this.credentialsForm.value;

    const questions = [
      {
        questionId: questionInformation.question1,
        answer: questionInformation.answer1,
      },
      {
        questionId: questionInformation.question2,
        answer: questionInformation.answer2,
      },
      {
        questionId: questionInformation.question3,
        answer: questionInformation.answer3,
      },
    ];

    this.http
      .post('/api/session/register', {
        firstName: contactInformation.firstName,
        lastName: contactInformation.lastName,
        email: contactInformation.email,
        phoneNum: contactInformation.phoneNum,
        address: contactInformation.address,

        userName: credentialsInformation.userName,
        password: credentialsInformation.password,

        securityQuestions: questions,
      })
      .subscribe((res) => {
        this.router.navigate(['/session/sign-in']);
      });
    alert('Registration success');
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNum: [
        null,
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      email: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
    });

    this.questionsForm = this.fb.group({
      question1: [null, Validators.compose([Validators.required])],
      question2: [null, Validators.compose([Validators.required])],
      question3: [null, Validators.compose([Validators.required])],
      answer1: [null, Validators.compose([Validators.required])],
      answer2: [null, Validators.compose([Validators.required])],
      answer3: [null, Validators.compose([Validators.required])],
    });

    this.credentialsForm = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/\d/),
          Validators.pattern(/[A-Z]/),
        ]),
      ],
    });

    this.fetchQuestions();
  }

  fetchQuestions(): void {
    this.http
      .get('/api/security-questions')
      .subscribe((res: SecurityQuestion[]) => {
        this.questions = res;
      });
  }
}
