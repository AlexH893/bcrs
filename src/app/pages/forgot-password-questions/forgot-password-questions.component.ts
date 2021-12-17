import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityQuestion } from 'src/app/models/security-question.interface';

@Component({
  selector: 'app-forgot-password-questions',
  templateUrl: './forgot-password-questions.component.html',
  styleUrls: ['./forgot-password-questions.component.css']
})
export class ForgotPasswordQuestionsComponent implements OnInit {

  securityquestion1: SecurityQuestion
  securityquestion2: SecurityQuestion
  securityquestion3: SecurityQuestion
  username: String
  questionsFetched: Boolean = false

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.username = route.snapshot.params.username
    this.fetchQuestions()
   }

  ngOnInit(): void {
  }

  fetchQuestions() {
    const url = `/api/users/${this.username}/security-questions`
    this.http.get(url).subscribe((securityQuestions: SecurityQuestion[]) => {

      this.securityquestion1 = securityQuestions[0]
      this.securityquestion2 = securityQuestions[1]
      this.securityquestion3 = securityQuestions[2]
      this.questionsFetched = true
    },(error) => {
      console.log(error)
      alert(error.error.message)
      this.router.navigate(['/session/forgot-password']);
    })
  }

  getState() {
    return {
      "questionText1": this.securityquestion1.text,
      "questionText2": this.securityquestion2.text,
      "questionText3": this.securityquestion3.text,
      "answerText1": this.securityquestion1.answer,
      "answerText2": this.securityquestion2.answer,
      "answerText3": this.securityquestion3.answer
    }
  }

  confirm() {
    const url = `/api/session/verify/users/${this.username}/security-questions`
    this.http.post(url, this.getState()).subscribe((res: any) => {
      if (res.msg === "success") {
        this.router.navigate(["/session/forgot-password/confirm"],{state: {username: this.username}})
      }
      else  {
        alert("Failed to verify security questions")
      }
    })
  }

}
