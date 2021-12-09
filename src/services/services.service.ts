
// import statements
import { Injectable } from '@angular/core';
import { IService } from '../interfaces/services.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  typesOfServices: Array<IService> = [
    {name:'Password Reset ($39.99)', value: 39.99},
    {name:'Spyware Removal ($99.99)', value: 99.99},
    {name:'RAM Upgrade ($129.99)', value: 129.99},
    {name:'Software Installation ($49.99)', value: 49.99},
    {name:'Keyboard Cleaning ($45.00)', value: 45.00},
    {name:'Disk Clean-up ($149.99)', value: 149.99}
    ];

  constructor() { }
}
