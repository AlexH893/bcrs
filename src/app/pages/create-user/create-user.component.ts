import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { User } from '../../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityQuestion } from 'src/app/models/security-question.interface';
import { Role } from 'src/app/models/role.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: User;
  securityQuestions: SecurityQuestion[];
  roles: Role[];
  title: string;
  createUserForm = new FormGroup({});

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,
    public flexLayout: FlexLayoutModule,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {user: User, newUser: boolean}) {
      this.user = data.user
      if (!this.user.role) {
        this.user.role = {_id: "", text: ""}
      }
      this.title = data.newUser?"Create": "Edit"
      while (this.user.securityQuestions.length < 3) {
        this.user.securityQuestions.push({
          question: {
            _id: "",
            text:"",
          },
          answer: "",
          isDisabled: false
        })
      }
     }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      lastName: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      userName: [null, Validators.compose([Validators.required])],
      phone: [
        null,
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      userRole: [null, Validators.compose([Validators.required])],
      securityQuestion1text: [null, Validators.compose([Validators.required])],
      securityQuestion2text: [null, Validators.compose([Validators.required])],
      securityQuestion3text: [null, Validators.compose([Validators.required])],
      securityQuestion1: [null, Validators.compose([Validators.required])],
      securityQuestion2: [null, Validators.compose([Validators.required])],
      securityQuestion3: [null, Validators.compose([Validators.required])],

    });
   this.fetchQuestions()
   this.fetchRoles()
  }

  fetchQuestions(): void {
    this.http.get('/api/security-questions').subscribe((res: SecurityQuestion[]) => {
      this.securityQuestions = res
    });
  }

  fetchRoles(): void {
    this.http.get('/api/roles').subscribe((res:{data: Role[]}) => {
      this.roles = res.data
    });
  }

  onSubmit():void {
    if (this.data.newUser) {
      this.user.date_created = new Date()
      this.user.date_modified = new Date()
      this.http.post("/api/users", this.user)
      .subscribe((res: User) => {
        this.dialogRef.close(res)
      })
    }
    else {
      this.user.date_modified = new Date()
      this.http.put(`/api/users/${this.user._id}`, this.user)
      .subscribe((res: User) => {
        this.dialogRef.close(res)
      })
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}


