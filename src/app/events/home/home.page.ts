import { Component, OnInit } from '@angular/core';
import { SVEvent } from '../interfaces/svevent';
import { EventsService } from '../services/events.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  events: SVEvent[] = [];

  constructor(
    private eventsService: EventsService,
  ) { }


  // loads events
  ionViewWillEnter() {
    this.eventsService.getEvents().subscribe({
      next: events => {
        this.events = events;
        console.log(events);
      },
      error: error => console.error(error),
    });
  }

  // reload events
  refresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();
    setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
    }, 1000);
  }

}
