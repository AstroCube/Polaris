import {Component} from '@angular/core';
import {faDog, faHome, faKey, faShoppingCart, faStar} from '@fortawesome/free-solid-svg-icons';
import {
  faCcAmazonPay,
  faCcAmex,
  faCcApplePay,
  faCcDiscover,
  faCcJcb,
  faCcMastercard,
  faCcPaypal,
  faCcVisa
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'shop-main',
  templateUrl: './shop.main.component.html'
})

export class ShopMainComponent {
  faCcAmazonPay = faCcAmazonPay;
  faCcApplePay = faCcApplePay;
  faCcAmex = faCcAmex;
  faCcDiscover = faCcDiscover;
  faCcJcb = faCcJcb;
  faCcMastercard = faCcMastercard;
  faCcPaypal = faCcPaypal;
  faCcVisa = faCcVisa;
  faDog = faDog;
  faHome = faHome;
  faKey = faKey;
  faShoppingCart = faShoppingCart;
  faStar = faStar;
}
