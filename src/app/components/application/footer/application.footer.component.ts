import {Component} from '@angular/core';
import {faFacebookF, faGitlab, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'application-footer',
  templateUrl: './application.footer.component.html'
})

export class ApplicationFooterComponent {
  faFacebookF = faFacebookF;
  faGitlab = faGitlab;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
}
