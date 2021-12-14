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
      lastName: [this.user.lastName, Validators.compose([Validators.required])],
      firstName: [this.user.firstName, Validators.compose([Validators.required])],
      userName: [this.user.userName, Validators.compose([Validators.required])],
      phone: [
        this.user.phoneNum,
        Validators.compose([Validators.required, Validators.minLength(10)]),
      ],
      address: [this.user.address, Validators.compose([Validators.required])],
      email: [this.user.email, Validators.compose([Validators.required])],
      userRole: [this.user.role._id, Validators.compose([Validators.required])],
      securityQuestion1text: [this.user.securityQuestions[0].question._id, Validators.compose([Validators.required])],
      securityQuestion2text: [this.user.securityQuestions[1].question._id, Validators.compose([Validators.required])],
      securityQuestion3text: [this.user.securityQuestions[2].question._id, Validators.compose([Validators.required])],
      securityQuestion1: [this.user.securityQuestions[0].answer, Validators.compose([Validators.required])],
      securityQuestion2: [this.user.securityQuestions[1].answer, Validators.compose([Validators.required])],
      securityQuestion3: [this.user.securityQuestions[2].answer, Validators.compose([Validators.required])],

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
    const newUser = this.createUserForm.getRawValue()
    this.user.lastName = newUser.lastName
    this.user.firstName = newUser.firstName
    this.user.userName = newUser.userName
    this.user.phoneNum = newUser.phone
    this.user.address = newUser.address
    this.user.email = newUser.email
    this.user.role._id = newUser.userRole
    this.user.securityQuestions[0].question._id = newUser.securityQuestion1text
    this.user.securityQuestions[1].question._id = newUser.securityQuestion2text
    this.user.securityQuestions[2].question._id = newUser.securityQuestion3text
    this.user.securityQuestions[0].answer = newUser.securityQuestion1
    this.user.securityQuestions[1].answer = newUser.securityQuestion2
    this.user.securityQuestions[2].answer = newUser.securityQuestion3
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


