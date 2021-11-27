import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: User
  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {user: User, newUser: boolean}) {
      this.user = data.user
     }

  ngOnInit(): void {
  }

  onSubmit():void {
    if (this.data.newUser) {
      this.user.date_created = new Date()
      this.user.date_modified = new Date()
      this.http.post("/api/user", this.user)
      .subscribe((res: User) => {
        this.dialogRef.close(res)
      })
    }
  }

}
