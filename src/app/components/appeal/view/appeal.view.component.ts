import {Component} from '@angular/core';
import {faComment, faGavel, faLock, faUserTie} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appeal-view',
  templateUrl: './appeal.view.component.html'
})

export class AppealViewComponent {

  faComment = faComment;
  faGavel = faGavel;
  faLock = faLock;
  faUserTie = faUserTie;
}
