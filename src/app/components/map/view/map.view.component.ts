import {Component} from '@angular/core';
import {faCode, faMapSigns} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'map-view',
  templateUrl: './map.view.component.html'
})

export class MapViewComponent {
  faCode = faCode;
  faMapSigns = faMapSigns;
}
