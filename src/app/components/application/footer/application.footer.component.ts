import {Component} from '@angular/core';
import {faFacebookF, faGithub, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'application-footer',
  templateUrl: './application.footer.component.html'
})

export class ApplicationFooterComponent {

  public date = new Date();

  faFacebookF = faFacebookF;
  faGithub = faGithub;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
}
