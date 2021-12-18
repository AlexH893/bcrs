import { Component, Inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/services/services.service';
import { MatListOption } from '@angular/material/list';
import { IService } from '../../models/services.interface';
import { HttpClient } from '@angular/common/http';
import { Invoice } from 'src/app/models/invoice';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.css']
})
export class InvoiceDialogComponent implements OnInit {

  date : string;
  totalCharge : number;
  Invoice: [{

  }]

  constructor(private http: HttpClient, private datePipe: DatePipe, @Inject(MAT_DIALOG_DATA) public data: { services: IService[],
    laborHours: number,
    partsAmount: number
  }) {
    this.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

  }

  getSelectedServices(): IService[]{
    return this.data.services.filter(service => service.selected);
  }

  createInvoice(userName: string, invoice: Invoice): Observable<any> {
    return this.http.post(`/api/invoice/${userName}`, {
        userName : userName,
        lineItems: invoice.getLineItems(),
        partsAmount: invoice.partsAmount,
        laborAmount: invoice.getLaborAmount(),
        lineItemTotal: invoice.getLineItemTotal(),
        total: invoice.getTotal()
    })
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
