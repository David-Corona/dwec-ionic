import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: UserLogin = {
    email: '',
    password: '',
    lat: 0,
    lng: 0
  };
  socialUser;
  coords = {
    lat: 0,
    lng: 0
  };
  accessToken = '';

  constructor(
    private authService: AuthService,
  ) { }


  async ngOnInit() {
    this.geolocate();

    // const resp = await FacebookLogin.getCurrentAccessToken() as FacebookLoginResponse;
    // console.log(resp);
    // if (resp.accessToken) {
    // this.accessToken = resp.accessToken.token;
    // }
  }

  // if geolocation is active, save coords
  async geolocate() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      if (coordinates){
        this.coords.lat = coordinates.coords.latitude;
        this.coords.lng = coordinates.coords.longitude;
      }
    } catch (e) {
      console.error(e);
    }
  }

  // normal login
  tryLogin() {
    this.user.lat = this.coords.lat;
    this.user.lng = this.coords.lng;
    this.authService.login(this.user);
  }

  // google login
  async loginGoogle() {
    try {
      this.socialUser = await GoogleAuth.signIn();
      this.authService.loginSocial('google', this.socialUser.authentication.idToken, this.coords.lat, this.coords.lng);
    } catch (err) {
      console.error(err);
    }
  }

  // fb login (Doesn't work)
  async loginFacebook() {
    try {
      //console.log(this.socialUser);
      //this.authService.loginSocial('facebook', this.socialUser.authentication.idToken, this.coords.lat, this.coords.lng);
    } catch (err) {
      console.error(err);
    }
  }


}
