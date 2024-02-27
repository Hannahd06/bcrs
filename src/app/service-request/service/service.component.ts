import { Component } from '@angular/core';
import { ServiceItem } from '../service-item.interface';
import { ServicesListService } from '../services.service';
import { Order } from '../order';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

  services: Array<ServiceItem>;
  user: any;
  order: Order;
  lineItems: Array<ServiceItem>;
  id: number;
  date: string;
  lineItemTotal: number;
  partsAmount: number;
  laborAmount: number;
  invoiceTotal: number;

  email: string = ''
  fullName: string = ''

  isLoading: boolean = false;
  errorMessage: string;

  formSubmitted: boolean = false;

  serviceRequestForm: FormGroup = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    fullName: [null, Validators.compose([Validators.required])]
  })

  constructor(
    private serviceListService: ServicesListService,
    private router: Router,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private invoiceService: InvoiceService
  ) {
    this.lineItems = [];
    this.lineItemTotal = 0;
    this.partsAmount = 0;
    this.laborAmount = 0;
    this.invoiceTotal = 0;
    this.order = new Order();
    this.id = Math.floor(Math.random() * 10000) + 10000;
    this.date = new Date().toLocaleDateString();
    this.services = this.serviceListService.getServiceList();

    this.errorMessage = '';

    const session_user =  this.cookieService.get('session_user')
    if (session_user) {
      this.user = JSON.parse(session_user)
    }


  }

  createOrder () {
    this.formSubmitted = true;
    for (let item of this.services) {
      if (item.checked) {
        const {name, price} = item;
        this.order.lineItems.push({name, price} as any)
      }
    }
    this.order.itemsTotal();

    this.order.partsAmount = parseFloat(this.order.partsAmount.toString());
    this.order.laborAmount =  parseFloat((this.order.laborAmount * 50).toString());
    this.order.date = this.date;
    console.log(this.order.partsAmount);
    console.log (this.order.laborAmount);

    this.order.invoiceTotal = parseFloat(this.order.getOrderTotal());

     console.log("invoiceTotal:", this.order.invoiceTotal)
     let formData = this.order;

     this.invoiceService.createInvoice(formData). subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigate(['invoice-summary'])
      },
       error: (err) => {
        if (err.errorMessage.message) {
          this.errorMessage = err.error.message
          this.isLoading = false;
        } else {
          this.errorMessage= 'Something went wrong';
          this.isLoading = false
        }
      }
     })


  }




}
