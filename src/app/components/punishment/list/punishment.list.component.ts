import {Component} from '@angular/core';
import {faDog, faHome, faInfo, faKey, faShoppingCart, faStar, faTag, faTimes} from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'punishment-list',
  templateUrl: './punishment.list.component.html'
})

export class PunishmentListComponent {
  faDog = faDog;
  faHome = faHome;
  faInfo = faInfo;
  faKey = faKey;
  faShoppingCart = faShoppingCart;
  faStar = faStar;
  faTag = faTag;
  faTimes = faTimes;
}
