import { ServiceItem } from "./service-item.interface";
export class Order {
  email: string ='';
  fullName: string = '';
  lineItems: Array<ServiceItem>;
  id: number;
  date: string;
  lineItemTotal: number;
  partsAmount: number;
  laborAmount: number;
  invoiceTotal: number;

  constructor() {
    this.lineItems = []
    this.lineItemTotal = 0
    this.partsAmount = 0
    this.laborAmount = 0
    this.invoiceTotal = 0

    this.id = Math.floor(Math.random() * 40000) + 10000;
    this.date = new Date().toLocaleDateString();
  }


  itemsTotal() {
    let servicesTotal = 0;
    for (const lineItem of this.lineItems) {
      servicesTotal += lineItem.price
    }
    this.lineItemTotal = parseFloat(servicesTotal.toFixed(2));
  }

  getOrderTotal() {
    let total = 0;
    for (let item of this.lineItems) {
      total += item.price;
    }
    console.log('Current Total:', total);
    total = total + parseFloat(this.partsAmount.toString()) + parseFloat(this.laborAmount.toString());

    return total.toFixed(2);
  }


}
