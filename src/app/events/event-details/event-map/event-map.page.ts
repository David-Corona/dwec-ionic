import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation';
import { NavController } from '@ionic/angular';
import { SVEvent } from '../../interfaces/svevent';
import { EventDetailsPage } from '../event-details.page';


@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.page.html',
  styleUrls: ['./event-map.page.scss'],
})
export class EventMapPage implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) mapComp: MapComponent;
  event: SVEvent;
  lat = 0;
  lng = 0;
  zoom = 16;

  constructor(
    private nav: NavController,
    @Inject(EventDetailsPage) private parentComponent: EventDetailsPage
  ) { }

  async ngOnInit() {
    this.parentComponent.event$.subscribe(
      event => this.event = event
    );
  }

  // to resize map
  ngAfterViewInit() {
    this.mapComp.mapLoad.subscribe(
      () => {
        this.mapComp.mapInstance.resize();
      }
    );
  }

  // navigation to event location
  startNavigation() {
    StartNavigation.launchMapsApp({
      latitude: this.event.lat,
      longitude: this.event.lng,
      name: 'Directions example',
    });
  }

}
