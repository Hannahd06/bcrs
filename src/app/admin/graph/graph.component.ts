//--------------------------------------------
//Title: graph.component.js
//Author: Jocelyn Dupuis, Kyle Dochdoerfer, and Hannah Del Real
//Date: 02/26/24
//Description: ts file for the graph component for BCRS
//---------------------------------------------

//import statements
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/service-request/invoice.service';
import { Chart, Legend, registerables } from 'chart.js';
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
    //calls the findPurchasesByServiceGraph and subscribes to the observable
    this.invoiceService.findPurchasesByServiceGraph().subscribe({
      next: (res) => {
        this.purchases = res;

        //clears prior data before populating
        this.labels.length = 0;
        this.itemCount.length = 0;

        //for statement for service items in purchase
        for (let item of this.purchases) {
          let title = item._id.title;
          let count = item.count;

          //pushes service labels and total service item count to graph
          this.labels.push(title);
          this.itemCount.push(count);
        }

        //creates pie chart and passes service data and options objects to the chart constructor
        const hufflepuffPie = new Chart('hufflepuffPieChart', {
          //type of chart: pie
          type: 'pie',
          data: {
            //displays data labels
            labels: this.labels,
            datasets: [
              {
                //data for dataset
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

          },

        });
        //set the chart labels default color to white
        Chart.defaults.color = '#ffffff';
        //set the chart labels default size to 20
        Chart.defaults.font.size = 20;

      },
    });
  }
}
