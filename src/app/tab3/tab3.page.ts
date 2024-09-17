import { Component, OnInit } from '@angular/core';
import { BLEDeviceService } from '../service/bledevice.service';
import { ConnectionComponent } from '../components/connection/connection.component'; 

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  component = ConnectionComponent;
  hours_sync: number = 12;  
  dropdown1 = 12 + "";
  isDeviceConnected: boolean = false;
  bledevice : any;
  max_sound: number = 60;

  constructor(bledevice: BLEDeviceService) {
    console.log(bledevice.isConnected)
    this.bledevice = bledevice;
    console.log('isconnected2 ' + this.bledevice.isConnected);
  }

  ngOnInit(): void {
    this.hours_sync = 12;
    
  }


  sendEmail(){
    
  }


}
