import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide = true;
  form: FormGroup;
  error: string = "";

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null]
    })

  }

  login() : void {
    const username = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;


    this.http.get('/api/users').subscribe((users: any[]) =>
    {
      if (users)
      {
        console.log(users);

        let user: any;

        users.forEach(eachUser => {

          if(eachUser.username == username){
            user = eachUser;
          }
        });
        if (user == undefined){
          this.error = 'Invalid user credentials. Please try again.';
          return;
        }

        if(user.password != password){
          this.error = 'Invalid user credentials. Please try again.';
          return;
        }


        // Add first and last name to session storage
        sessionStorage.setItem('session_user', username);

        this.router.navigate(['/']);
      }
    })
  }
  }


