import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { User } from '../../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityQuestion } from 'src/app/models/security-question.interface';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: User
  securityQuestions: string[]
  title: string
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,
    public flexLayout: FlexLayoutModule,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {user: User, newUser: boolean}) {
      this.user = data.user
      this.title = data.newUser?"Create": "Edit"
      while (this.user.securityQuestions.length < 3) {
        this.user.securityQuestions.push({
          text:"",
          answer: "",
          isDisabled: false
        })
      }
     }

  ngOnInit(): void {
   this.fetchQuestions()
  }

  fetchQuestions(): void {
    this.http.get('/api/security-questions').subscribe((res: SecurityQuestion[]) => {
      this.securityQuestions = res.map((question) => question.text);
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


