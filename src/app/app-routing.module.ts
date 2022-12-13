import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginActivateGuard } from './auth/guards/login-activate.guard';
import { LogoutActivateGuard } from './auth/guards/logout-activate.guard';
import { EventIdGuard } from './events/guards/event-id.guard';
import { EventResolver } from './events/resolver/event.resolver';

const routes: Routes = [
  {
    path: 'register',
    canActivate: [LogoutActivateGuard],
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    canActivate: [LogoutActivateGuard],
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    canActivate: [LoginActivateGuard],
    loadChildren: () => import('./events/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'event-details/:id',
    canActivate: [LoginActivateGuard, EventIdGuard],
    loadChildren: () => import('./events/event-details/event-details.module').then( m => m.EventDetailsPageModule),
    resolve: {
      event: EventResolver
    }
  },
  {
    path: 'event-details/:id/edit',
    canActivate: [LoginActivateGuard, EventIdGuard],
    loadChildren: () => import('./events/event-form/event-form.module').then( m => m.EventFormPageModule),
    resolve: {
      event: EventResolver
    }
  },
  {
    path: 'event-form',
    canActivate: [LoginActivateGuard],
    loadChildren: () => import('./events/event-form/event-form.module').then( m => m.EventFormPageModule)
  },
  {
    path: 'profile',
    canActivate: [LoginActivateGuard],
    loadChildren: () => import('./users/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
