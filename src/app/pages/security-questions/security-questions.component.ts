import { Component, OnInit } from '@angular/core';
import { CreateQuestionDialogComponent } from 'src/app/shared/create-question-dialog/create-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SecurityQuestion } from 'src/app/models/security-question.interface';

@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.css']
})

export class SecurityQuestionsComponent implements OnInit {
  securityQuestions: SecurityQuestion[];
  constructor(private dialog: MatDialog) {}


  ngOnInit(): void {}

  //Task dialog to open when user hits button
  openCreateQuestionDialog() {
    const dialogRef = this.dialog.open(CreateQuestionDialogComponent, {
      disableClose: true
    })
  }

  deleteQuestion(){}

  updateQuestion(){}

}
