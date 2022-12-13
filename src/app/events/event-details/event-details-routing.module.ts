import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventResolver } from '../resolver/event.resolver';

import { EventDetailsPage } from './event-details.page';

const routes: Routes = [
  {
    path: '',
    component: EventDetailsPage,
    resolve: {
      event: EventResolver
    },
    children: [
      {
        path: 'info',
        loadChildren: () => import('./event-info/event-info.module').then( m => m.EventInfoPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./event-map/event-map.module').then( m => m.EventMapPageModule)
      },
      {
        path: 'comments',
        loadChildren: () => import('./event-comments/event-comments.module').then( m => m.EventCommentsPageModule)
      },
      {
        path: 'attendees',
        loadChildren: () => import('./event-attendees/event-attendees.module').then( m => m.EventAttendeesPageModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'info' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventDetailsPageRoutingModule {}
