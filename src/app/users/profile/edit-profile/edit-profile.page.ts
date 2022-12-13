import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  @Input() user;
  updatedName;
  updatedEmail;

  constructor(public modalCtrl: ModalController) { }

  // load name and email in form
  ngOnInit() {
    this.updatedName = this.user.name;
    this.updatedEmail = this.user.email;
  }

  // when edit is pressed, send name and email back
  editUser() {
    this.modalCtrl.dismiss({name: this.updatedName, email: this.updatedEmail});
  }

  // on close, don't send anything back
  close() {
    this.modalCtrl.dismiss();
  }
}
