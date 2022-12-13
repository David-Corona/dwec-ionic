import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventAttendeesPageRoutingModule } from './event-attendees-routing.module';

import { EventAttendeesPage } from './event-attendees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventAttendeesPageRoutingModule
  ],
  declarations: [EventAttendeesPage]
})
export class EventAttendeesPageModule {}
