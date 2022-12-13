import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { MapComponent } from 'ngx-mapbox-gl';
import { ModalController } from '@ionic/angular';
import { EditProfilePage } from './edit-profile/edit-profile.page';
import { EditPasswordPage } from './edit-password/edit-password.page';
import { EditAvatarPage } from './edit-avatar/edit-avatar.page';
import { ToastController, NavController  } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) mapComp: MapComponent;
  lat = 0;
  lng = 0;
  zoom = 16;
  user: User = {
    name: '',
    email: '',
    avatar: '',
    lat: 0,
    lng: 0
  };


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    public modalCtrl: ModalController,
    private toast: ToastController,
  ) {}

  ngOnInit() {
    // get the user from the router's data
    this.user = this.route.snapshot.data.user;
    console.log(this.user);
  }

  // for map resizing
  ngAfterViewInit() {
    this.mapComp.mapLoad.subscribe(
      () => {
        this.mapComp.mapInstance.resize();
      }
    );
  }

  async openEditProfile() {
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { user: this.user }
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.name && result.data.email) {
      this.user.name = result.data.name;
      this.user.email = result.data.email;
      this.userService.saveProfile(this.user.name, this.user.email).subscribe({
        next: async () => {
          this.showToast(
            'Profile updated successfully!',
            'checkmark-circle-outline',
            'success'
          );
        },
        error: async (error) => {
          this.showToast(
            'Profile could not be updated!',
            'alert-circle-outline',
            'danger'
          );
          console.error(error);
        }
      });
    }
  }

  async openEditPassword() {
    const modal = await this.modalCtrl.create({
      component: EditPasswordPage,
      //componentProps: { user: this.user }
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.password) {
      this.user.password = result.data.password;
      this.userService.savePassword(this.user.password).subscribe({
        next: async () => {
          this.showToast(
            'Password updated successfully!',
            'checkmark-circle-outline',
            'success'
          );
        },
        error: async (error) => {
          this.showToast(
            'Password could not be updated!',
            'alert-circle-outline',
            'danger'
          );
          console.error(error);
        }
      });
    }
  }

  async openEditAvatar() {
    const modal = await this.modalCtrl.create({
      component: EditAvatarPage,
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result.data && result.data.avatar) {
      this.user.avatar = result.data.avatar;
      this.userService.saveAvatar(this.user.avatar).subscribe({
        next: async () => {
          this.showToast(
            'Avatar updated successfully!',
            'checkmark-circle-outline',
            'success'
          );
        },
        error: async (error) => {
          this.showToast(
            'Avatar could not be updated!',
            'alert-circle-outline',
            'danger'
          );
          console.error(error);
        }
      });
    }
  }

  async showToast(message, icon, color){
    const toast = await this.toast.create({
      duration: 3000,
      position: 'bottom',
      message,
      icon,
      color
      });
      toast.present();
  }

}
