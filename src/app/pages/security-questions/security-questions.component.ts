import { Component, OnInit } from '@angular/core';
import { CreateQuestionDialogComponent } from 'src/app/shared/create-question-dialog/create-question-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SecurityQuestion } from 'src/app/models/security-question.interface';
import { HttpClient } from '@angular/common/http';
import { User } from 'server/models/user';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-security-questions',
  templateUrl: './security-questions.component.html',
  styleUrls: ['./security-questions.component.css'],
})
export class SecurityQuestionsComponent implements OnInit {
  displayedColumns = ["text", "functions"]
  questions = new MatTableDataSource<SecurityQuestion>([]);
  constructor(public dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchQuestions();
  }

  //Task dialog to open when user hits button
  openCreateQuestionDialog(): void {
    const dialogRef = this.dialog.open(CreateQuestionDialogComponent, {
      width: '600px',
      data: {
        question: {
          text: '',
        },
        newQuestion: true
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.questions.data.push(result);
        this.questions.data = this.questions.data
        console.log(this.questions)
      }

    });
  }

  fetchQuestions(): void {
    this.http.get('/api/security-questions').subscribe((res: SecurityQuestion[]) => {
      this.questions.data = res;
    });
  }

  deleteQuestion(i: number) {
    const question: SecurityQuestion = this.questions.data[i];
    this.http.delete(`/api/security-questions/${question._id}`).subscribe(() => {
      this.questions.data.splice(i, 1);
      this.questions.data = this.questions.data
    });
  }

  updateQuestion(question: SecurityQuestion): void {
    const dialogRef = this.dialog.open(CreateQuestionDialogComponent, {
      width: '600px',
      data: {
        question: question,
        newQuestion: false,
      },
    });
    dialogRef.afterClosed().subscribe((res:SecurityQuestion) => {
      if(res) {
        question.text = res.text
        this.questions.data = this.questions.data
        console.log(this.questions)
      }

    });
  }
}
