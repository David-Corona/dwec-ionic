import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/users/interfaces/user';
import { UserService } from 'src/app/users/services/user.service';
import { SVEvent } from '../../interfaces/svevent';
import { EventsService } from '../../services/events.service';
import { EventDetailsPage } from '../event-details.page';


@Component({
  selector: 'app-event-attendees',
  templateUrl: './event-attendees.page.html',
  styleUrls: ['./event-attendees.page.scss'],
})
export class EventAttendeesPage implements OnInit {

  event: SVEvent;
  attendees: User[];
  me: User;

  constructor(
    private eventService: EventsService,
    private userService: UserService,
    @Inject(EventDetailsPage) private parentComponent: EventDetailsPage
  ) { }

  ngOnInit() {
    this.parentComponent.event$.subscribe(
      event => {
        this.event = event;
        this.getAttendees();
      }
    );
    this.userService.getUser().subscribe({
      next: (u) => this.me = u,
      error: error => console.error(error),
    });
  }

  attendance(){
    if (this.event.attend) { // if attending => don't attend, deduct one from number attendees & take out of list of attendees
      this.eventService.deleteAttend(this.event.id).subscribe({
        next: () => {
          this.event.attend = false;
          this.event.numAttend--;
          this.getAttendees();
        },
        error: error => console.error(error),
      });
    } else { // if not attending => attend, add one to number attendees & add to list of attendees
      this.eventService.postAttend(this.event.id).subscribe({
        next: () => {
          this.event.attend = true;
          this.event.numAttend++;
          this.attendees.push(this.me);
        },
        error: error => console.error(error)
      });
    }
  }

  // get list of users that attend this event
  getAttendees() {
    this.eventService.getAttendees(this.event.id).subscribe({
      next: at => this.attendees = at,
      error: error => console.error(error),
    });
  }

}
