import {Component} from '@angular/core';

import {faDiscord, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'application-staff',
  templateUrl: './application.staff.component.html'
})

export class ApplicationStaffComponent {

  faTwitter = faTwitter;
  faDiscord = faDiscord;
  faEnvelope = faEnvelope;


}
