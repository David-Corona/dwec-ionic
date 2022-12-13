import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAvatarPage } from './edit-avatar.page';

const routes: Routes = [
  {
    path: '',
    component: EditAvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAvatarPageRoutingModule {}
