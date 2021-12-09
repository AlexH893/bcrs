import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityQuestion } from 'src/app/models/security-question.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-question-dialog',
  templateUrl: './create-question-dialog.component.html',
  styleUrls: ['./create-question-dialog.component.css']
})
export class CreateQuestionDialogComponent implements OnInit {
  questionForm: FormGroup;
  securityQuestion: SecurityQuestion;
  titletext: String
  submitbuttontext: String
  constructor(private dialogRef: MatDialogRef<CreateQuestionDialogComponent>, private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {question: SecurityQuestion, newQuestion: boolean}) {
      this.securityQuestion = data.question
      this.titletext = data.newQuestion? "Create a New Security Question" : "Edit Security Question"
      this.submitbuttontext = data.newQuestion? "Create": "Edit"

    }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      text: [this.securityQuestion.text, Validators.compose([Validators.required])]
    })
  }

  // create question and close dialog
  createQuestion():void {
    if (this.data.newQuestion) {
      this.http.post("/api/security-questions", this.questionForm.value)
      .subscribe((res: SecurityQuestion) => {
        this.dialogRef.close(res)
      })
    }
    else {
      this.http.put(`/api/security-questions/${this.securityQuestion._id}`, this.questionForm.value)
      .subscribe((res: SecurityQuestion) => {
        this.dialogRef.close(res)
      })
    }
  }

  // Do not create question and close dialog
  cancel() {
    this.dialogRef.close();
  }

}
