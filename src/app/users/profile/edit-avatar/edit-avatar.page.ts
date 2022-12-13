import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.page.html',
  styleUrls: ['./edit-avatar.page.scss'],
})
export class EditAvatarPage {

  updatedAvatar;

  constructor(public modalCtrl: ModalController) { }

  updateAvatar() {
    this.modalCtrl.dismiss({avatar: this.updatedAvatar});
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async takePhoto() {;
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    this.updatedAvatar = photo.dataUrl;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    this.updatedAvatar = photo.dataUrl;
  }

}
