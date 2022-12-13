import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventMapPageRoutingModule } from './event-map-routing.module';

import { EventMapPage } from './event-map.page';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgxMapboxGlGeocoderControlModule } from 'ngx-mapbox-gl-geocoder-control';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventMapPageRoutingModule,
    NgxMapboxGLModule,
    NgxMapboxGlGeocoderControlModule
  ],
  declarations: [EventMapPage]
})
export class EventMapPageModule {}
