import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-question-dialog',
  templateUrl: './create-question-dialog.component.html',
  styleUrls: ['./create-question-dialog.component.css']
})
export class CreateQuestionDialogComponent implements OnInit {
  questionForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateQuestionDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }

  // create task and close dialog
  createQuestion() {
    this.dialogRef.close(this.questionForm.value);
  }

  // Do not create task and close dialog
  cancel() {
    this.dialogRef.close();
  }

}
