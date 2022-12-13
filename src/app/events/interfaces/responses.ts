import { SvComment } from './svcomment';
import { SVEvent } from './svevent';

export interface EventsResponse {
  events: SVEvent[];
}

export interface EventResponse {
  event: SVEvent;
}

export interface CommentResponse {
  comment: SvComment;
}

export interface CommentsResponse {
  comments: SvComment[];
}
