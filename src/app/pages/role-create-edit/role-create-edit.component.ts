import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/models/role.interface';

@Component({
  selector: 'app-role-create-edit',
  templateUrl: './role-create-edit.component.html',
  styleUrls: ['./role-create-edit.component.css']
})
export class RoleCreateEditComponent implements OnInit {
  roleForm: FormGroup;
  role: Role;
  titletext: String
  submitbuttontext: String
  constructor(private dialogRef: MatDialogRef<RoleCreateEditComponent>, private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {role: Role, newRole: boolean}) {
      this.role = data.role
      this.titletext = data.newRole? "Create a New Role" : "Edit Role"
      this.submitbuttontext = data.newRole? "Create": "Edit"

    }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      text: [this.role.text, Validators.compose([Validators.required])]
    })
  }

  // create question and close dialog
  createRole():void {
    if (this.data.newRole) {
      this.http.post("/api/roles", this.roleForm.value)
      .subscribe((res: Role) => {
        this.dialogRef.close(res)
      })
    }
    else {
      this.http.put(`/api/roles/${this.role._id}`, this.roleForm.value)
      .subscribe((res: Role) => {
        this.dialogRef.close(res)
      })
    }
  }

  // Do not create question and close dialog
  cancel() {
    this.dialogRef.close();
  }

}
