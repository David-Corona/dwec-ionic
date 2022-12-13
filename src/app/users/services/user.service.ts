import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse, AvatarResponse } from '../interfaces/responses';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = 'users';

  constructor(private readonly http: HttpClient) { }

  getUser(id?: number): Observable<User> {
    let resp: Observable<UserResponse> = null;
    if (id) { //if id is received by parameter
      resp = this.http.get<UserResponse>(`${this.userURL}/${id}`);
    } else { //if no id, then get user logged in (me)
      resp = this.http.get<UserResponse>(`${this.userURL}/me`);
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    return resp.pipe(map(resp => resp.user));
  }

  saveProfile(name: string, email: string): Observable<void> {
    return this.http.put<void>(`${this.userURL}/me`, {name, email});
  }

  saveAvatar(avatar: string): Observable<string> {
    return this.http.put<AvatarResponse>(`${this.userURL}/me/photo`, {avatar}).pipe
      (map(resp => resp.avatar)
    );
  }

  savePassword(password: string): Observable<void> {
    return this.http.put<void>(`${this.userURL}/me/password`, {password});
  }

}
