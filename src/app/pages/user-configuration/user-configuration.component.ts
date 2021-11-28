import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.css']
})
export class UserConfigurationComponent implements OnInit {
  users: User[]
  constructor(public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers()
  }

  createUser(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '250px',
      data: {
        user: {
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          phoneNum: "",
          address: "",
          email: "",
          role: "",
          securityQuestions: [],
          _v: 0
        },
        newUser: true
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  updateUser(user: User): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '250px',
      data: {
        user: user,
        newUser: false
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  fetchUsers(): void {
    this.http.get('/api/user').subscribe((res: User[]) => {
      this.users = res
    })
  }

}
