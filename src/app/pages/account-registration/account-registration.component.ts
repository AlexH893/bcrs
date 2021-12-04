import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true }
  }]
})

export class AccountRegistrationComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
