import {Component} from '@angular/core';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'shop-transaction',
  templateUrl: './shop.transaction.component.html'
})

export class ShopTransactionComponent {
  faRecipt = faReceipt;
}
