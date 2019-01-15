import {Component} from '@angular/core';
import {faList} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'report-view',
  templateUrl: './report.view.component.html'
})

export class ReportViewComponent {
  faList = faList;
}
