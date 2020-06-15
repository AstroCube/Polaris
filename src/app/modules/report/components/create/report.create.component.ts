import {Component, OnInit} from '@angular/core';
import {faList, faPlus} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {ReportService} from '../../../../services/report.service';
import {NotifierService} from 'angular-notifier';
import {Title} from '@angular/platform-browser';
import {IUser, IUserPlaceholder} from "../../../../newModels/user/IUser";
import {IReportCreation} from "../../../../newModels/IReport";
import {getUserPlaceholder} from "../../../../utilities/group-placeholder";
import {GLOBAL} from "../../../../services/global";

@Component({
  selector: 'report-create',
  templateUrl: './report.create.component.html'
})

export class ReportCreateComponent implements OnInit{

  public user: IUser;
  public report: IReportCreation;
  faList = faList;
  faPlus = faPlus;

  constructor(
    private titleService: Title,
    private notifierService: NotifierService,
    private reportService: ReportService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = {} as IUser;
    this.report = {} as IReportCreation;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.ReportCreateGuard.user;
      this.report.registeredAddress = data.ReportCreateGuard.ip;
      this.titleService.setTitle("Reportando a " + this.user.display + " - " + GLOBAL.title);
    });
  }

  public getPlaceholder(user: IUser): IUserPlaceholder {
    return getUserPlaceholder(user);
  }

  createReport() {
    this.report.involved = this.user;
    this.reportService.reportCreate(this.report).subscribe(
      response => {
        this.notifierService.notify('success', "Haz creado una apelación correctamente.");
        this.router.navigate(['/reportar/' +  response._id]);
      },

      error => {
        let error_message = <any> error;
        if (error_message != null) {
          this.notifierService.notify('error', error.error.message);
        }
      }
    );
  }

}
