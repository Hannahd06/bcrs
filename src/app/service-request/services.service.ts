import { Injectable } from '@angular/core';
import { ServiceItem } from './service-item.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesListService {
  ServiceList: Array<ServiceItem>

  constructor() {
    this.ServiceList = [
      {
        id: 801,
        name: 'Password Reset',
        image: 'lock_reset',
        price: 39.99,
        checked: false
      },
      {
        id: 802,
        name: 'Spyware Removal',
        image: 'visibility_off',
        price: 99.99,
        checked: false
      },
      {
        id: 803,
        name: 'Ram Upgrade',
        image: 'memory',
        price: 129.99,
        checked: false
      },
      {
        id: 804,
        name: 'Software Installation',
        image: 'install_desktop',
        price: 49.99,
        checked: false
      },
      {
        id: 805,
        name: 'PC Tune-up',
        image: 'sync',
        price: 89.99,
        checked: false
      },
      {
        id: 806,
        name: 'Disc Clean-up',
        image: 'cleaning_services',
        price: 129.99,
        checked: false
      },
      {
        id: 807,
        name: 'Keyboard Cleaning',
        image: 'keyboard',
        price: 45.00,
        checked: false
      }
    ]


   }
   getServiceList(): Array<ServiceItem> {
    return this.ServiceList
  }
}
