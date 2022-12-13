import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { SVEvent } from '../../interfaces/svevent';
import { EventsService } from '../../services/events.service';
import { EventDetailsPage } from '../event-details.page';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.page.html',
  styleUrls: ['./event-info.page.scss'],
})
export class EventInfoPage implements OnInit {

  event: SVEvent;

  constructor(
    private alertCrl: AlertController,
    private eventService: EventsService,
    private nav: NavController,
    private toastCtrl: ToastController,
    @Inject(EventDetailsPage) private parentComponent: EventDetailsPage
  ) { }

  ngOnInit() {
    this.parentComponent.event$.subscribe(
      event => this.event = event
    );
  }

  // delete event => alert to confirm => toast to show result
  async delete() {
    const alert = await this.alertCrl.create({
      header: 'Delete event',
      message: 'Are you sure you want to delete this event?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.eventService
              .deleteEvent(this.event.id)
              .subscribe(
                async ev => {
                  (await this.toastCtrl.create({
                    position: 'bottom',
                    duration: 3000,
                    message: 'Event deleted succesfully',
                    color: 'success'
                  })).present();
                  this.nav.navigateBack(['/home']);
                },
                async error => (await this.toastCtrl.create({
                  position: 'bottom',
                  duration: 3000,
                  message: 'Error deleting event'
                })).present()
              );
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

}
