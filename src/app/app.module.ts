import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { BLEDeviceService } from './service/bledevice.service';
import { ExportService } from './service/export.service';

@NgModule({
  declarations: [AppComponent],
  imports: [    BrowserModule, NgApexchartsModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BLEDeviceService,ExportService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
