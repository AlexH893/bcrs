/*
============================================
; Title: Bobs Computer Repair Shop
; Author: Professor Krasso
; Date: 12 Dec 2021
; Modified By: Angela Martin, Alex Haefner & Sarah Jean Baptiste
; Description: Invoice service file
===========================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice';


@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    constructor(private http: HttpClient ) { }

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

    findPurchasesByServicesGraph(): Observable<any> {
        return this.http.get(`/api/invoice/purchases-graph`);
    }
}
