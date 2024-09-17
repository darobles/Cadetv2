import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  { NgApexchartsModule } from 'ng-apexcharts';
import { LinechartComponent } from './linechart.component';



@NgModule({
  declarations: [ LinechartComponent  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ],
  exports: [
    LinechartComponent
  ]
})
export class ComponentsModule { }
