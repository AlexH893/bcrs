

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { Role } from 'src/app/models/role.interface';
import { SecurityQuestion } from 'src/app/models/security-question.interface';

import { RoleCreateEditComponent } from '../role-create-edit/role-create-edit.component';

@Component({
  selector: 'app-role-configuration',
  templateUrl: './role-configuration.component.html',
  styleUrls: ['./role-configuration.component.css']
})
export class RoleConfigurationComponent implements OnInit {

  displayedColumns = ["text", "functions"]
  roles = new MatTableDataSource<Role>([]);
  constructor(public dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRoles();
  }

  //Task dialog to open when user hits button
  openRoleCreateEdit(): void {
    const dialogRef = this.dialog.open(RoleCreateEditComponent, {
      width: '600px',
      data: {
        role: {
          text: '',
        },
        newRole: true
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.roles.data.push(result.data);
        this.roles.data = this.roles.data
        console.log(this.roles)
      }

    });
  }

  fetchRoles(): void {
    this.http.get('/api/roles').subscribe((res:{data: Role[]}) => {
      this.roles.data = res.data;
    });
  }

  deleteRole(i: number) {
    const role: Role = this.roles.data[i];
    this.http.delete(`/api/roles/${role._id}`).subscribe(() => {
      this.roles.data.splice(i, 1);
      this.roles.data = this.roles.data
    });
  }

  updateRole(role: Role): void {
    const dialogRef = this.dialog.open(RoleCreateEditComponent, {
      width: '600px',
      data: {
        role: role,
        newRole: false,
      },
    });
    dialogRef.afterClosed().subscribe((res:{data:Role}) => {
      if(res) {
        role.text = res.data.text
        this.roles.data = this.roles.data
        console.log(this.roles)
      }

    });
  }

}

