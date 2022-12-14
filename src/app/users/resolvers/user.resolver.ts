import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

  constructor(
    private usersService: UserService,
    private router: Router
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.usersService.getUser(+route.params.id).pipe(
      catchError((error) => {
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }


}
