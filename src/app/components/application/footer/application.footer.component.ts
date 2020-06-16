import {Component} from '@angular/core';

@Component({
  selector: 'application-footer',
  templateUrl: './application.footer.component.html'
})

export class ApplicationFooterComponent {

  public date = new Date();
}
