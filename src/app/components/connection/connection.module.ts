import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConnectionComponent } from './connection.component'; 

import { ConnectionRoutingModule } from './connection-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ConnectionRoutingModule
  ],
  declarations: [ConnectionComponent]
})
export class ConnectionModule {}
