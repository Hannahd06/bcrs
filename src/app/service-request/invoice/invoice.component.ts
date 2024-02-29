import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../order';
import { InvoiceService } from '../invoice.service';
import { CookieService } from 'ngx-cookie-service';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  order: Order;
  isLoading: boolean;
  id: string;
  errorMessage: string

  constructor(
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
    ) {
      this.isLoading = true;
      this.order = {} as Order;
      this.id = this.route.snapshot.queryParamMap.get('id') ?? '';
      this.errorMessage = '';


    }
  ngOnInit() {
    // Call API to get invoice by Id.
    this.invoiceService.getInvoice(this.id).subscribe({
      next: (invoice: any) => {
        // set Order values to values obtain for invoice with matching id in database
        this.order = invoice;
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorMessage = `Invoice #${this.id} does not exist in our records. Please try again or contact customer service.`
        }
        //Set error handing for if no security questions are found, or if the email was not found
        console.error('Could not get invoice! Please try again.', err)
      }, complete: () => {
        this.isLoading =false
    }
  });
    }
    // Create a function to allow user to print invoice page.
    printInvoice() {
      window.print();
    }

  }

