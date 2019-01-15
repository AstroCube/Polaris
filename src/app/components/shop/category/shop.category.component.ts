import {Component} from '@angular/core';
import {faDog, faHome, faKey, faShoppingCart, faStar, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'shop-category',
  templateUrl: './shop.category.component.html'
})

export class ShopCategoryComponent {
  faDog = faDog;
  faHome = faHome;
  faKey = faKey;
  faShoppingCart = faShoppingCart;
  faStar = faStar;
  faTimes = faTimes;
  public opened = false;
}
