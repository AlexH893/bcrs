import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-confirm',
  templateUrl: './forgot-password-confirm.component.html',
  styleUrls: ['./forgot-password-confirm.component.css']
})
export class ForgotPasswordConfirmComponent implements OnInit {
  newpassword: String
  confirmpassword: String
  username: String
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.username = this.router.getCurrentNavigation()?.extras?.state?.username

  }

  ngOnInit(): void {
    if (!this.username) {
      this.router.navigate(['/session/forgot-password']);
    }
  }

  submit(): void {
    if (!this.newpassword || this.newpassword.trim().length == 0) {
      alert("Please enter password value")
    }else  if (!this.confirmpassword || this.confirmpassword.trim().length == 0) {
      alert("Please enter confirm password.")
    }
    else if (this.newpassword === this.confirmpassword) {
      let url = `/api/session/users/${this.username}/reset-password`
      const body = {password: this.newpassword}
      this.http.post(url, body).subscribe(() => {
        this.router.navigate(['/session/sign-in']);
      })
    }else {
      alert("Passwords do not match!")
    }
  }

}
