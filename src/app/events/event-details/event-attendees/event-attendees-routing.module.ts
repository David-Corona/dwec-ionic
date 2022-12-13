import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventAttendeesPage } from './event-attendees.page';

const routes: Routes = [
  {
    path: '',
    component: EventAttendeesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventAttendeesPageRoutingModule {}
