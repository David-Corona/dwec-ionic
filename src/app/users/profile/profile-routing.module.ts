import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolver } from '../resolvers/user.resolver';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: ':id',
    component: ProfilePage,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'edit-password',
    loadChildren: () => import('./edit-password/edit-password.module').then( m => m.EditPasswordPageModule)
  },
  {
    path: 'edit-avatar',
    loadChildren: () => import('./edit-avatar/edit-avatar.module').then( m => m.EditAvatarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
