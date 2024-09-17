import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { BLEDeviceService } from 'src/app/service/bledevice.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent  implements OnInit {
  navController: any;
  bledevice: any;
  classRotateSync: string = "";
  constructor(navController: NavController, bledevice: BLEDeviceService, private loadingCtrl: LoadingController ) {
    this.navController = navController;
    this.bledevice = bledevice;
   }

  ngOnInit() {
    console.log('Init connection');

  }

  scan(){
    this.bledevice.isConnected = !this.bledevice.isConnected;
    console.log('isconnected ' + this.bledevice.isConnected);
  }



  goBack() {
    this.navController.back();
  }
}
