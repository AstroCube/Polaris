import {Component} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'application-alert',
  templateUrl: './application.alert.component.html'
})

export class ApplicationAlertComponent {
  faTrash = faTrash;
}
