import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.css']
})
export class UserConfigurationComponent implements OnInit {
  displayedColumns = ["username", "firstName", "lastName", "phoneNum", "email", "functions"]
  users = new MatTableDataSource<User>([]);
  constructor(public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers()
  }

  createUser(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '250px',
      data: {
        user: {
          userName: "",
          password: "",
          firstName: "",
          lastName: "",
          phoneNum: "",
          address: "",
          email: "",
          role: {text:""},
          securityQuestions: [
            {
              question: {text: "None"},
              answer: "",
              isDisabled: false
            },
            {
              question: {text: "None"},
              answer: "",
              isDisabled: false
            },
            {
              question: {text: "None"},
              answer: "",
              isDisabled: false
            }
          ],
          isDisabled: false,
          _v: 0
        },
        newUser: true
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.users.data.push(result)
        this.users.data = this.users.data
      }

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
      this.users.data = this.users.data
    });
  }

  fetchUsers(): void {
    this.http.get('/api/users').subscribe((res: User[]) => {
      this.users.data = res
    })
  }

  deleteUser(i: number) {
    const user: User = this.users.data[i]
    this.http.delete(`/api/users/${user._id}`).subscribe(() => {
      this.users.data.splice(i, 1)
      this.users.data = this.users.data
    })
  }

}
