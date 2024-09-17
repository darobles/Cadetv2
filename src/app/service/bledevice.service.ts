import { Injectable } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class BLEDeviceService {
  isConnected: boolean = false;
  datas : any= [];
  ble: boolean = false;
  scanText: string = "";
  temperature: string = "";
  humidity: string = "";
  isScanningEnabled: boolean = false;
  intervalID: any;
  scanResults: any[] = [];
  CADET_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e'
  CADET_CHARACTERISTIC_UUID =  '6e400003-b5a3-f393-e0a9-e50e24dcca9e'
  device: any;
  classRotateSync: string = "";

  constructor(private loadingCtrl: LoadingController) {
    BleClient.initialize({ androidNeverForLocation: true }).then(() => {
      BleClient.isEnabled().then((res) =>{
        if(res){
          this.ble = true;
        }
        else{
          this.ble = false;
        }
      })
    });
    
   }

   async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Conectando...',
      duration: 5000,
    });
   // await this.loadingCtrl.dismiss();
    loading.present();

    
  }

  onScanToggle() {
    this.classRotateSync = "foo";
    this.isScanningEnabled = !this.isScanningEnabled;
    console.log("Begin scan")

    this.beginScanning();

    /*if (this.isScanningEnabled) {
      this.beginScanning();
    } else {
      this.endScanning();
    }*/
  }

  async beginScanning() {
    this.scanResults = [];
    try {
              //start scanning for advertisment packets from the BLE device
      await BleClient.requestLEScan({allowDuplicates: false},
      (res: any) => {
        
        if(res.localName)
        {
          /*alert(res.localName) */
          this.scanResults.push(res.device);         
        }
        
      });

      setTimeout(async () => {
        // end scanning for advertisment packet from the BLE device
        BleClient.stopLEScan();
        this.classRotateSync = "";
      }, 5000);

    } catch (err) {
      console.log(err);
    }
  }

  async disconnect(){
    await BleClient.disconnect(this.device.deviceId).then(() =>{
      this.isConnected = false;
      this.device = null;
      
    });
  }

  async endScanning() {
    clearInterval(this.intervalID);
  }

  clearScanResults() {
    this.scanResults = [];
  }

  addToList(value: any){
    this.scanResults.push(value);
}
 onDisconnect(deviceId: string): void {
  alert('device disconnected');
}

async connDevice(device: any){
    this.showLoading();
    await BleClient.connect(device.deviceId, (deviceId) => this.onDisconnect(deviceId),{timeout:(5000)}  ).then(
      () => {
        this.isConnected = true;
        this.device = device;        
        this.loadingCtrl.dismiss();
        alert("Conectado a " + device.localName);
        //this.readDevice(device);
      }
    );

    await BleClient.startNotifications(
      device.deviceId,
      this.CADET_UUID, 
      this.CADET_CHARACTERISTIC_UUID,
      (value) => {
        const byteArray = new Uint8Array(value.buffer);
        const textDecoder = new TextDecoder('utf-8');
        alert(textDecoder.decode(byteArray));

      }
    );


    
}
async readDevice(device: any){
  alert('reading')
  let battery = await BleClient.read(device.deviceId, this.CADET_UUID, this.CADET_CHARACTERISTIC_UUID);
  alert('battery level' + battery.getUint8(0));


}

}

export interface device{
  deviceId: string;
  name: string;
  uuids: string[];

}