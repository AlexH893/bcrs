import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceDialogComponent } from '../invoice-dialog/invoice-dialog.component';
import { IService } from '../../models/services.interface'
import { ServicesService } from '../../../services/services.service'
import { MatSelectionList } from '@angular/material/list';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @ViewChild(MatSelectionList) selectedServices!: MatSelectionList;
  services: IService[] = [];
  laborAmount = 0;
  partsAmount = 0;

  constructor(
    public dialog: MatDialog,
    private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.services = this.servicesService.getServiceTypes();
  }

  // open dialog to display selected services, parts, labor and total of invoice
  openDialog(): void {
    const dialogRef = this.dialog.open(InvoiceDialogComponent, {
      data: { 
        services: JSON.parse(JSON.stringify (this.services)),
        laborHours: this.laborAmount,
        partsAmount: this.partsAmount
       }
    });
   

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };
}

