import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { User } from '../../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';



@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: User
  securityQuestions: string[]
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,
    public flexLayout: FlexLayoutModule,

    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {user: User, newUser: boolean}) {
      this.user = data.user
     }

  ngOnInit(): void {
    this.securityQuestions = ["What is the name of your favorite pet?", "What is your favorite color?", "What city were you born in?",
  "What is your favorite car?", "What is your favorite drink?", "What is your favorite food?"]
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

}
