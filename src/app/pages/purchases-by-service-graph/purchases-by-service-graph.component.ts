import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css']
})
export class PurchasesByServiceGraphComponent implements OnInit {
  data: any;
  purchases: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {

    /*
    * Calling the purchase-graph API
    */

    this.invoiceService.findPurchasesByServicesGraph().subscribe(res => {

      // Mapping the response data to the purchases var
      this.purchases = res['data'];
       // this.purchases = [];

      // Looping over purchases to split out the services & item count
      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }

      // Build object literal for the primeNG bar graph
      this.data = {
        labels: this.labels, // This is for services
        datasets: [
          // The graph object
          {
            backgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#6B3FA0',
              '#AF593E',
              '#6CDAE7',
            ],
            hoverBackgroundColor: [
              '#ED0A3F',
              '#FF8833',
              '#5FA777',
              '#0066CC',
              '#6B3FA0',
              '#AF593E',
              '#6CDAE7'
            ],
            data: this.itemCount
          },
        ]
      };

      console.log('Data object');
      console.log(this.data);

    })
   }

  ngOnInit(): void {
  }

}
