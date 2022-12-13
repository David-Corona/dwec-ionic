import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SVEvent } from '../interfaces/svevent';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Result } from 'ngx-mapbox-gl-geocoder-control';
import { MapComponent } from 'ngx-mapbox-gl';
import { EventsService } from '../services/events.service';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.page.html',
  styleUrls: ['./event-form.page.scss'],
})
export class EventFormPage implements OnInit, AfterViewInit {

  @ViewChild('eventForm') eventForm: NgForm;
  @ViewChild(MapComponent) mapComp: MapComponent;
  event: SVEvent = {
    title: '',
    description: '',
    price: 0,
    image: '',
    date: '',
    lat: 0,
    lng: 0,
    address: ''
  };

  minDate: string = new Date().toISOString();
  isNewEvent = true;
  imageName = '';

  constructor(
    private eventsService: EventsService,
    private toastCtrl: ToastController,
    private nav: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    // if we are editing, get the event to edit. If not, it will be null.
    if (this.route.snapshot.paramMap.get('id')) {
      this.getEventToEdit();
    }
  }

  // to resize map
  ngAfterViewInit() {
    this.mapComp.mapLoad.subscribe(
      () => {
        this.mapComp.mapInstance.resize();
      }
    );
  }

  // in event editing
  getEventToEdit(){
    this.isNewEvent = false; // in edit
    this.event = this.route.snapshot.data.event;
    this.event.date = this.event.date.replace(' ', 'T');
  }

  // edit event, show toast, navigate
  editEvent() {
    this.eventsService.editEvent(this.event.id, this.event).subscribe(
      async (ev) => {
        (await this.toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: 'Event updated succesfully',
          color: 'success'
        })).present();
        this.nav.navigateBack(['/home']);
      },
      async error => (await this.toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Error adding event'
      })).present()
    );
  }


// Create event
  addEvent() {
    this.eventsService.addEvent(this.event).subscribe(
      async ev => {
        (await this.toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: 'Event added succesfully',
          color: 'success'
        })).present();
        this.nav.navigateRoot(['/home']);
      },
      async error => (await this.toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'Error adding event'
      })).present()
    );
  }


  changePosition(result: Result) {
    this.event.lat = result.geometry.coordinates[1];
    this.event.lng = result.geometry.coordinates[0];
    this.event.address = result.place_name;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      allowEditing: true,
      resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });
    this.event.image = photo.dataUrl;
  }


}
