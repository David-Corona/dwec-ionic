import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserLogin } from '../interfaces/user';
import { TokenResponse, UserResponse } from '../interfaces/responses';
import { switchMap, catchError, map } from 'rxjs/operators';
import { NavController  } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged = false;
  loginChange$ = new ReplaySubject<boolean>(1);
  private authURL = 'auth';

  constructor(
    private readonly http: HttpClient,
    private nav: NavController,
    private alertCtrl: AlertController
    ) { }


  login(userLogin: UserLogin): Observable<void> {
    const token = this.http.post<TokenResponse>(`${this.authURL}/login`, userLogin);
    this.saveToken(token);
    return of(undefined);
  }

  // receives observable token => saves in localstorage, logged & loginChange as true and relocate to home/events. If not, show error.
  async saveToken(token: Observable<TokenResponse>): Promise<void> {
    token.subscribe({
      next: async (t) => {

        try {
          await Storage.set({ key: 'token', value: t.accessToken });
          this.logged = true;
          this.loginChange$.next(true);
          this.nav.navigateRoot(['/home']);
        } catch (e) {
          throw new Error('Can\'t save authentication token in storage!');
        }
      },
      error: async (error) => {
        console.error(error);

        (await this.alertCtrl.create({
          header: 'Login error',
          message: 'Login details are incorrect.<br/>' + 'Please check credentials and try again.',
          buttons: ['Ok'],
        })).present();
      }
    });
  }

  loginSocial(socialWeb: string, tokenG: string, lat: number, lng: number): Observable<void> {
    const token = this.http.post<TokenResponse>(`${this.authURL}/${socialWeb}`, {tokenG, lat, lng});
    this.saveToken(token);
    return of(undefined);
  }


  register(userInfo: User): Observable<User> {
    return this.http.post<UserResponse>(`${this.authURL}/register`, userInfo).pipe(
      map(resp => resp.user)
    );
  }

  async logout(): Promise<void> {
    await Storage.remove({ key: 'token' });
    this.logged = false;
    this.loginChange$.next(false);
    //this.nav.navigateRoot(['/login']);
  }

  isLogged(): Observable<boolean> {
    if (this.logged) {
      return of(true);
    }
    return from(Storage.get({ key: 'token' })).pipe(
      switchMap((token) => {
        if (!token.value) {
          throw new Error();
        }
        return this.http.get(`${this.authURL}/validate`).pipe(
          map(() => {
            this.logged = true;
            this.loginChange$.next(true);
            return true;
          }),
          catchError((error) => of(false))
        );
      }),
      catchError((e) => of(false))
    );
  }
}
