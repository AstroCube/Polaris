import {Component} from '@angular/core';
import {faList, faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'report-list',
  templateUrl: './report.list.component.html'
})

export class ReportListComponent {
  faList = faList;
  faPlus = faPlus;
}
