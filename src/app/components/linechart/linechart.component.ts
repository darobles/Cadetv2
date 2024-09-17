import {Component, ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import * as jsonData from '../../../assets/data.json';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-line-chart',
  //standalone: true,
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent {
  @ViewChild('chart', {static: true}) chart: ChartComponent| any;
  public chartOptions: ChartOptions;
  cadetData: any = jsonData;
  dataLabel:any = [];
  dataArray:any = [];
  chartData: dataJson[] = [];

  constructor(private http: HttpClient) {
    console.log(this.cadetData[1])
    this.http.get<any[]>('../../../assets/data.json').pipe( 
      map((arr: any[]) => arr.sort((o1, o2) => o1.decibels - o2.decibels) //replace for datetime
      )).subscribe((data) => {
      for(let i = 0; i < data.length; i++){
        this.dataArray.push(Number(data[i].decibels), );
        this.dataLabel.push(new Date(data[i].date).getHours());
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
}

export interface dataJson{
  id: number,
  decibels: number,
  datetime: string

}