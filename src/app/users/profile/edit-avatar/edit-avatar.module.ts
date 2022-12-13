import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAvatarPageRoutingModule } from './edit-avatar-routing.module';

import { EditAvatarPage } from './edit-avatar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAvatarPageRoutingModule
  ],
  declarations: [EditAvatarPage]
})
export class EditAvatarPageModule {}
