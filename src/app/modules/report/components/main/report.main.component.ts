import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../services/global';
import {UserService} from "../../../../services/user.service";
import {IUser} from "../../../../newModels/user/IUser";

@Component({
  selector: 'report-main',
  templateUrl: './report.main.component.html'
})

export class ReportMainComponent implements OnInit {

  public users: IUser[];
  public selectedUser: IUser;
  public reportingStaff: boolean;

  constructor(
    private titleService: Title,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.users = [];
    this.selectedUser = null;
    this.reportingStaff = false;
  }

  ngOnInit() {
    this.titleService.setTitle("Reportes - " + GLOBAL.title);
  }

  updateQuery(event: any) {
    if (event.term.length > 2) {
      this.userService.userListAutocompleteObservable(false, event.term).subscribe(
        users => {
          this.users = users;
        }
      );
    }
  }

  clearUser() {
    this.selectedUser = null;
    this.users = [];
  }

  checkStaff() {
    this.reportingStaff = this.selectedUser.groups.some(g => g.group.staff);
  }

  beginReport() {
    this.router.navigate(['/reportar/nuevo'], {queryParams: {user: this.selectedUser._id}});
  }
}
