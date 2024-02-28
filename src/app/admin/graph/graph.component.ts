//--------------------------------------------
//Title: graph.component.js
//Author: Jocelyn Dupuis, Kyle Dochdoerfer, and Hannah Del Real
//Date: 02/26/24
//Description: ts file for the graph component for BCRS
//---------------------------------------------

//import statements
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/service-request/invoice.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

//create and export graph component
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

//exports GraphComponent
export class GraphComponent implements OnInit {
  purchases: any;
  itemCount: string[] = [];
  labels: string[] = [];

  //initializes InvoiceService
  constructor(private invoiceService: InvoiceService) {
    this.purchases = [];
  }

  ngOnInit(): void {
    this.invoiceService.findPurchasesByServiceGraph().subscribe({
      next: (res) => {
        this.purchases = res;

        //clears prior data before populating
        this.labels.length = 0;
        this.itemCount.length = 0;

        for (let item of this.purchases) {
          let title = item._id.title;
          let count = item.count;

          this.labels.push(title);
          this.itemCount.push(count);
        }

        //creates pie chart and inserts service data
        const hufflepuffPie = new Chart('hufflepuffPieChart', {
          //type of chart: pie
          type: 'pie',
          data: {
            datasets: [
              {
                data: this.itemCount,
                //background color for label blocks and pie slices
                backgroundColor: [
                  '#EEBA35',
                  '#FFD25F',
                  '#7D6B5D',
                  '#372E29',
                  '#223164',
                  '#0F1D4A',
                  '#5D5D5D',
                ],
                //background color when mouse hovers over pie slice
                hoverBackgroundColor: [
                  '#EEBA35',
                  '#FFD25F',
                  '#7D6B5D',
                  '#372E29',
                  '#223164',
                  '#0F1D4A',
                  '#5D5D5D',
                ],

              },
            ],
            //displays data labels
            labels: this.labels,
          },

        });
        Chart.defaults.color = '#ffffff ';
        Chart.defaults.font.size = 20;
      },
    });
  }
}
