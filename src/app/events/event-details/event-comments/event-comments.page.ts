import { Component, Inject, OnInit } from '@angular/core';
import { SvComment } from '../../interfaces/svcomment';
import { SVEvent } from '../../interfaces/svevent';
import { EventsService } from '../../services/events.service';
import { EventDetailsPage } from '../event-details.page';


@Component({
  selector: 'app-event-comments',
  templateUrl: './event-comments.page.html',
  styleUrls: ['./event-comments.page.scss'],
})
export class EventCommentsPage implements OnInit {

  event: SVEvent;
  comments: SvComment[] = [];
  newComment: SvComment = {
    comment: ''
  };

  constructor(
    private eventService: EventsService,
    @Inject(EventDetailsPage) private parentComponent: EventDetailsPage,
  ) {}

  ngOnInit() {
    this.parentComponent.event$.subscribe(
      event => {
        this.event = event;
        this.showComments();
      }
    );
  }

  // shows list of comments.
  showComments() {
    this.eventService.getComments(this.event.id).subscribe({
      next: coms => this.comments = coms,
      error: error => console.error(error),
    });
  }

  // post comment, push to array of comments and clean new comment textarea.
  postComment(){
    this.eventService.postComment(this.event.id, this.newComment).subscribe({
      next: (com) => {
        this.comments.push(com);
        this.newComment.comment = '';
      },
      error: error => console.error(error)
    });
  }

}
