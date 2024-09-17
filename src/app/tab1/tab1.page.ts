import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BLEDeviceService } from '../service/bledevice.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  items: Record[] = []


  constructor(private bledevice: BLEDeviceService) { }

  ngOnInit(): void {
    let max = 120;
    let min = 30;
    for(var i = 0; i < 20; i++){
      let rec1: Record;
      let noise_number = Math.floor(Math.random() * (max - min) + min);
      rec1 = {
        id: 1,
        datetime: "10:15:35",
        data: noise_number
      }
      this.items.push(rec1);
    }

  }

}

export interface Record{
  id: number;
  datetime: String;
  data: number;

}