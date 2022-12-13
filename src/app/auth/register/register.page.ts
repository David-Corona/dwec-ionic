import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController, NavController  } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';


// crear metodo para todos los toast???


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {
    name: '',
    email: '',
    password: '',
    avatar: '',
    lat: 0,
    lng: 0
  };
  email2 = '';

  constructor(
    private authService: AuthService,
    private toast: ToastController,
    private nav: NavController
  ) { }

  ngOnInit() {

  }


  async geolocate() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log(coordinates);
      if (coordinates){
        this.user.lat = coordinates.coords.latitude;
        this.user.lng = coordinates.coords.longitude;
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      const toast = await this.toast.create({
        duration: 4000,
        position: 'bottom',
        header: 'Error!',
        message: 'Could not obtain coordinates! Please allow geolocation.',
        icon: 'alert-circle-outline',
        color: 'danger'
      });
      toast.present();
    }
  }


  async createAccount() {
    if (await this.geolocate()){ // if geolocation is allowed
      this.authService.register(this.user).subscribe({
        next: async () => {
          (await this.toast.create({
            duration: 4000,
            position: 'bottom',
            header: 'Success!',
            message: 'User registered successfully!',
            icon: 'checkmark-circle-outline',
            color: 'success'
          })).present();
          this.nav.navigateRoot(['/login']);
        },
        error: async (error) => {
          (await this.toast.create({
            duration: 4000,
            position: 'bottom',
            header: 'Error!',
            message: 'Could not create the account!',
            icon: 'alert-circle-outline',
            color: 'danger'
          })).present();
          console.error(error);
        }
      });
    }
  }

  async takePhoto() {;
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.user.avatar = photo.dataUrl;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });

    this.user.avatar = photo.dataUrl;
  }

}
