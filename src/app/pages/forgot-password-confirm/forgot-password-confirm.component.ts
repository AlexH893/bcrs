import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password-confirm',
  templateUrl: './forgot-password-confirm.component.html',
  styleUrls: ['./forgot-password-confirm.component.css']
})
export class ForgotPasswordConfirmComponent implements OnInit {
  newpassword: String
  confirmpassword: String

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.newpassword === this.confirmpassword) {
      let url = `/api/session/users/:userName/reset-password`
    }
  }

}
