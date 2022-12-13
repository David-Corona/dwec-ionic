import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventResponse, EventsResponse, CommentResponse, CommentsResponse } from '../interfaces/responses';
import { map } from 'rxjs/operators';
import { SVEvent } from '../interfaces/svevent';
import { environment } from 'src/environments/environment';
import { SvComment } from '../interfaces/svcomment';
import { User } from 'src/app/users/interfaces/user';
import { UsersResponse } from 'src/app/users/interfaces/responses';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventURL = 'events';

  constructor(private readonly http: HttpClient) { }


  getEvents(): Observable<SVEvent[]> {
    return this.http.get<EventsResponse>(this.eventURL).pipe(
      map(resp => resp.events)
    );
  }

  getEvent(id: number): Observable<SVEvent> {
    return this.http.get<EventResponse>(`${this.eventURL}/${id}`).pipe(
      map(resp => {
        const ev = resp.event;
        //ev.image = environment.baseUrl + '/' + ev.image;
        //ev.creator.avatar = environment.baseUrl + '/' + ev.creator.avatar;
        return ev;
      })
    );
  }

  addEvent(event: SVEvent): Observable<SVEvent> {
    return this.http.post<EventResponse>(this.eventURL, event).pipe(
      map(resp => resp.event)
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.eventURL}/${id}`);
  }

  editEvent(id: number, event: SVEvent): Observable<SVEvent> {
    return this.http.put<EventResponse>(`${this.eventURL}/${id}`, event).pipe(
      map(resp => resp.event)
    );
  }

  getComments(id: number): Observable<SvComment[]> {
    return this.http.get<CommentsResponse>(`${this.eventURL}/${id}`+'/comments').pipe(
      map(resp => resp.comments)
    );
  }

  postComment(id: number, comment: SvComment): Observable<SvComment> {
    return this.http.post<SvComment>(`${this.eventURL}/${id}`+'/comments', comment);
  }


  postAttend(id: number): Observable<void> {
    return this.http.post<void>(`${this.eventURL}/${id}`+'/attend', '');
  }

  deleteAttend(id: number): Observable<void> {
    return this.http.delete<void>(`${this.eventURL}/${id}`+'/attend');
  }

  getAttendees(id: number): Observable<User[]> {
    return this.http.get<UsersResponse>(`${this.eventURL}/${id}`+'/attend').pipe(
      map(resp => resp.users)
    );
  }

}
