import { Component, OnInit } from '@angular/core';
import { CreateQuestionDialogComponent } from 'src/app/shared/create-question-dialog/create-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SecurityQuestion } from 'src/app/models/security-question.interface';
import { HttpClient } from '@angular/common/http';
import { User } from 'server/models/user';


@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.css'],
})
export class SecurityQuestionsComponent implements OnInit {
  questions: SecurityQuestion[];
  constructor(public dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchQuestions;
  }

  //Task dialog to open when user hits button
  openCreateQuestionDialog(): void {
    const dialogRef = this.dialog.open(CreateQuestionDialogComponent, {
      width: '250px',
      data: {
        question: {
          text: '',
          answer: '',
        },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.questions.push(result);
    });
  }

  fetchQuestions(): void {
    this.http.get('/api/questions').subscribe((res: SecurityQuestion[]) => {
      this.questions = res;
    });
  }

  deleteQuestion(i: number) {
    const question: SecurityQuestion = this.questions[i];
    this.http.delete(`/api/questions/${question._id}`).subscribe(() => {
      this.questions.splice(i, 1);
    });
  }

  updateQuestion(question: SecurityQuestion): void {
    const dialogRef = this.dialog.open(CreateQuestionDialogComponent, {
      width: '250px',
      data: {
        question: question,
        newQuestion: false,
      },
    });
  }
}
