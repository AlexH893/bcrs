import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDialogComponent } from '../invoice-dialog/invoice-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // open dialog to display selected services, parts, labor and total of invoice
  openDialog(): void {
    const dialogRef = this.dialog.open(InvoiceDialogComponent)
  };
}

