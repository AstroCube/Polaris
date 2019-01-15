import {Component} from '@angular/core';
import {faUserPlus, faUsers, faUserTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'friendship',
  templateUrl: './friendship.component.html'
})

export class FriendshipComponent {
  faUsers = faUsers;
  faUserPlus = faUserPlus;
  faUserTimes = faUserTimes;
}
