import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/services/services.service';
import { MatListOption } from '@angular/material/list';
import { IService } from '../../models/services.interface';


@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.css']
})
export class InvoiceDialogComponent implements OnInit {

  date : string;
  totalCharge : number;

  constructor(private datePipe: DatePipe, @Inject(MAT_DIALOG_DATA) public data: { services: IService[],
    laborHours: number,
    partsAmount: number
  }) {
    this.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

  }

  getSelectedServices(): IService[]{
    return this.data.services.filter(service => service.selected);
  }

  ngOnInit(): void {
    let total = this.data.partsAmount;
    total = total + (this.data.laborHours * 50);
    this.getSelectedServices().forEach(service => {
      total = total + service.value;
    });
    this.totalCharge = total;
  }

}
