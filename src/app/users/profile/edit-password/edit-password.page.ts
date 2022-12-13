import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.page.html',
  styleUrls: ['./edit-password.page.scss'],
})
export class EditPasswordPage {

  updatedPassword;
  updatedPassword2;

  constructor(public modalCtrl: ModalController) { }

  editPassword() {
    this.modalCtrl.dismiss({password: this.updatedPassword});
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
