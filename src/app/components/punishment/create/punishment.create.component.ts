import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Punishment} from '../../../models/punishment';
import {IMyDpOptions} from 'mydatepicker';
import {PunishmentService} from '../../../services/punishment.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'punishment-create',
  templateUrl: './punishment.create.component.html'
})

export class PunishmentCreateComponent implements OnInit {

  public users: any[] = [];
  public punishment: Punishment;
  public report: any  ;
  public punishment_options: any[];
  public picker_options: IMyDpOptions;

  constructor(
    private _notifierService: NotifierService,
    private _punishmentService: PunishmentService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.picker_options = {
      dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
      monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
      dateFormat: 'dd-mm-yyyy',
      todayBtnTxt: 'Hoy',
      sunHighlight: false,
      allowDeselectDate: false,
      openSelectorTopOfInput: true,
      openSelectorOnInputClick: true,
      editableDateField: false,
      minYear: 2019,
      maxYear: 2020
    };
    this.punishment_options = [
      {value: "warn", label: "Advertencia"},
      {value: "kick", label: "Expulsión"},
      {value: "temp-ban", label: "Suspensión temporal"},
      {value: "ban", label: "Suspensión permanente"}
    ];

    this.punishment = new Punishment("","","", "","","","","","","", null,false,false,false);
  }

  ngOnInit() {
    this._route.data.subscribe((data => {
      this.report = data.PunishmentCreateGuard.report;
      this.users = data.PunishmentCreateGuard.list.fixed_users;
    }));
    if (this.report) {
      this.punishment.punished = this.users.filter(user => {
        return user.username === this.report.placeholder.username;
      })[0];
    }
  }

  onSubmit() {
    this.punishment.punished = this.punishment.punished._id;
    this.punishment.type = this.punishment.type.value;
    if (this.punishment.expires) this.punishment.expires = this.punishment.expires.epoc;
    let has_report = null;
    if (this.report) has_report = this.report.report;
    this._punishmentService.punishment_create(this.punishment, has_report).subscribe(
      response => {
        if (!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al crear la sanción.");
        } else {
          this._notifierService.notify('success', "Se ha creado la sanción correctamente.");
          this._router.navigate(["/sancion/" + response.punishment_stored._id]);
        }
      },

      error => {
        let error_message = <any> error;
        if (error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }

}
