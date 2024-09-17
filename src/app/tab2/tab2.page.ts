import { Component, ViewChild } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import * as jsonData from '../../assets/data.json';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  data: any = jsonData;

  @ViewChild('chart', { static: true }) chart: ChartComponent | any;
  public chartOptions: ChartOptions;
  cadetData: any = jsonData;
  dataLabel: any = [];
  dataArray: any = [];
  chartData: dataJson[] = [];

  constructor(private http: HttpClient) {
    console.log(this.cadetData[1])
    this.http.get<any[]>('../../../assets/data.json').pipe(
      map((arr: any[]) => arr.sort((o1, o2) => o1.decibels - o2.decibels) //replace for datetime
      )).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          this.dataArray.push(Number(data[i].decibels),);
          this.dataLabel.push(new Date(data[i].date));
        }

      });
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: this.dataArray//this.cadetData.map((x: { decibels: any; }) => x.decibels)//[10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Registros"
      },
      xaxis: {
        categories: this.dataLabel
      }
    };
  }

  writeSecretFile = async () => {
    let date = new Date();
    let name = "datacadet_" + date.getFullYear() + "" + date.getMonth() + 1 + "" + date.getDay() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds()
    let data = "";
    for(let i = 0; i < this.dataArray.length; i++){
      data += this.dataArray[i] + "," + this.dataLabel[i] + "\n";
    }
  
    await Filesystem.writeFile({
      path: name + '.csv',
      data: data,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  };
  writeData() {

    this.writeSecretFile();

  }

}
export interface dataJson{
  id: number,
  decibels: number,
  datetime: string

}