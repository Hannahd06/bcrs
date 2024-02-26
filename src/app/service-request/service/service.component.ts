import { Component } from '@angular/core';
import { ServiceItem } from '../service-item.interface';
import { ServicesListService } from '../services.service';
import { Order } from '../order';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

  services: Array<ServiceItem>;
  order: Order;
  user: any;

  lineItems: Array<ServiceItem>;
  id: number;
  date: string;
  lineItemTotal: number;
  partsAmount: number;
  laborAmount: number;
  totalCost: number;

  email: string = ''
  customerName: string = ''

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
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.lineItems = [];
    this.lineItemTotal = 0;
    this.partsAmount = 0;
    this.laborAmount = 0;
    this.totalCost = 0;

    this.id = Math.floor(Math.random() * 10000) + 10000;
    this.date = new Date().toLocaleDateString();
    this.services = this.serviceListService.getServiceList();
    this.order = new Order();

    const session_user = this.cookieService.get('session_user');
    if (session_user) {
      this.user = JSON.parse(session_user);
      console.log ('Current User:', this.user)
    }

    this.errorMessage = '';

  }





}
