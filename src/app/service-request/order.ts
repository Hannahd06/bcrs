import { ServiceItem } from "./service-item.interface";
export class Order {
  email: string ='';
customerName: string = '';
  lineItems: Array<ServiceItem>;
  id: number;
  date: string;
  lineItemTotal: number;
  partsAmount: number;
  laborAmount: number;
  totalCost: number;

  constructor() {
    this.lineItems = []
    this.lineItemTotal = 0
    this.partsAmount = 0
    this.laborAmount = 0
    this.totalCost = 0

    this.id = Math.floor(Math.random() * 10000) + 10000;
    this.date = new Date().toLocaleDateString();
  }

  servicesTotal() {
    let total = 0;
    for (let item of this.lineItems) {
      total += item.price;
    }
    console.log('Current Total:', total);
    total = total + parseFloat(this.partsAmount.toString()) + parseFloat(this.laborAmount.toString());

    return total.toFixed(2);
  }


}
