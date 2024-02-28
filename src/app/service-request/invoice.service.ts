//--------------------------------------------
//Title: invoice.service.ts
//Author: Hannah Del Real, Jocelyn Dupuis, and Kyle Dochdoerfer
//Date: 02/27/24
//Description: TS file for invoice service for BCRS
//---------------------------------------------

//import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) {}

  createInvoice(formData: any) {
    return this.http.post(`/api/invoices`, formData )
  }

  //function to get and return invoices
  getInvoices() {
    return this.http.get('/api/invoices/');
  }

  //function to find and return purchases by service graph
  findPurchasesByServiceGraph() {
    return this.http.get('/api/invoices/purchases-graph');
  }
}
