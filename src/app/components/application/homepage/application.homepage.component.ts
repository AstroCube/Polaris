import {Component} from '@angular/core';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'application-homepage',
  templateUrl: './application.homepage.component.html'
})

export class ApplicationHomepageComponent {

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

}
