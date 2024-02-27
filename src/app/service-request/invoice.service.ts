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
}