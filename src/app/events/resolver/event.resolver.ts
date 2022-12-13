import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SVEvent } from '../interfaces/svevent';
import { EventsService } from '../services/events.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<SVEvent> {

  constructor(
    private eventsService: EventsService,
    private router: Router
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SVEvent> {
    return this.eventsService.getEvent(+route.params['id']).pipe(
      catchError((error) => {
        this.router.navigate(['/home']);
        return EMPTY;
      })
    );
  }

}
