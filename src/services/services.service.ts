
// import statements
import { Injectable } from '@angular/core';
import { IService } from '../app/models/services.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  typesOfServices: IService[] = [
    {
      name:'Password Reset', 
      value: 39.99, 
      description:'Our password reset services can help you get back into your machines.',
      image: 'assets/pwreset.png'
    },
    {
      name:'Spyware Removal',
      value: 99.99,
      description: 'Is your computer running slow? You might need our spyware removal service.',
      image:'assets/spyware.png'
    },
    {
      name:'RAM Upgrade', 
      value: 129.99,
      description:'Looking for more power? Look no further.',
      image:"assets/ram.png"
    },
    {
      name:'Software Installation',
      value: 49.99,
      description:'If you need assistance installing software, we can help.',
      image: "assets/install.png"
    },
    {
      name:'Keyboard Cleaning', 
      value: 45.00,
      description:"If your keys get stuck or your keyboard has debris in between the keys, it's time for a clean.",
      image:"assets/keyboard.png"
    },
    {
      name:'Disk Clean-up', 
      value: 149.99,
      description:"Large/leftoverall installation files clogging your space? We can assist in cleaning things up.",
      image:"assets/cleanup.png"
    },
    {
      name:'PC Tuneup', 
      value: 149.99,
      description:'Computer running sluggishly? Not enough disk space? It might be time for a tuneUp.',
      image:"assets/tuneup.png"
    }
    ];

  constructor() { }

  getServiceTypes(): IService[]{
    return this.typesOfServices;
  }
}
