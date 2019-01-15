import {Component} from '@angular/core';
import {faComment, faList, faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'report-create',
  templateUrl: './report.create.component.html'
})

export class ReportCreateComponent {
  faComment = faComment;
  faList = faList;
  faPlus = faPlus;
}
