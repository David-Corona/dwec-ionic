import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './auth/services/auth.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  menuDisabled = true;
  public appPages = [
    {
      title: 'Event list',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Add Event',
      url: '/event-form',
      icon: 'add-circle',
    },
    {
      title: 'My profile',
      url: '/profile',
      icon: 'person',
    },
  ];


  constructor(
    private nav: NavController,
    private authService: AuthService,
    private platform: Platform,
  ) {
    this.initializeApp();
    this.authService.loginChange$.subscribe(
      (logged) => this.menuDisabled = !logged
    );
  }

  initializeApp() {
    if (this.platform.is('capacitor')) {
      this.platform.ready().then(() => {
        GoogleAuth.init();
      });
    }
  }

  async logout() {
    await this.authService.logout();
    this.nav.navigateRoot(['/login']);
  }

}
