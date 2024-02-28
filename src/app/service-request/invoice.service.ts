//--------------------------------------------
//Title: invoice.service.ts
//Author: Hannah Del Real, Jocelyn Dupuis, and Kyle Dochdoerfer
//Date: 02/27/24
//Description: TS file for invoice service for BCRS
//---------------------------------------------

//import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {}

  createInvoice(formData: any) {
    return this.http.post(`/api/invoices`, formData )
  }

  getInvoice(id: string) {
    return this.http.get(`/api/invoices/${id}/invoice`)
  }

  findPurchasesByServiceGraph() {
    return this.http.get(`/api/invoices/purchases-graph`)
  }
}
