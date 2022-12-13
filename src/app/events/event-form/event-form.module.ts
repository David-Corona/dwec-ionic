import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventFormPageRoutingModule } from './event-form-routing.module';

import { EventFormPage } from './event-form.page';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgxMapboxGlGeocoderControlModule } from 'ngx-mapbox-gl-geocoder-control';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventFormPageRoutingModule,
    NgxMapboxGLModule,
    NgxMapboxGlGeocoderControlModule
  ],
  declarations: [EventFormPage]
})
export class EventFormPageModule {}
