import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SVEvent } from '../interfaces/svevent';
import { EventsService } from '../services/events.service';
import { share, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event: SVEvent;
  event$: Observable<SVEvent>;

  constructor(
    private eventService: EventsService,
    private route: ActivatedRoute
  ) {
    this.event$ = this.eventService.getEvent(this.route.snapshot.params.id).pipe(shareReplay(1));
  }

  ngOnInit() {
    this.event$.subscribe(
      event => this.event = event
    );
  }

}
