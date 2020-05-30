import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';
import {NotifierService} from 'angular-notifier';
import {Title} from '@angular/platform-browser';
import {IPunishment, IPunishmentCreateData, PunishmentType} from "../../../../newModels/IPunishment";
import {PunishmentService} from "../../../../services/punishment.service";
import {GLOBAL} from "../../../../services/global";
import {IUser} from "../../../../newModels/user/IUser";

@Component({
  selector: 'punishment-create',
  templateUrl: './punishment.create.component.html'
})

export class PunishmentCreateComponent implements OnInit {

  public createData: IPunishmentCreateData;
  public punishment: IPunishment;
  public options: any[];
  public pickerOptions: IMyDpOptions;

  public expiration: any;
  public selectionLabel: string;
  public expires: boolean;
  public report: any;

  constructor(
    private _titleService: Title,
    private _notifierService: NotifierService,
    private _punishmentService: PunishmentService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.pickerOptions = {
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
    this.options = [];
    this._titleService.setTitle("Crear sanción - " + GLOBAL.title);
    this.punishment = {} as IPunishment;
    this.punishment.punished = {} as IUser;
    this.punishment.punished.username = '';
    this.punishment.punished.skin = 'steve';
  }

  ngOnInit() {
    this._route.data.subscribe((data => {
      // TODO: Add report again this.report = data.PunishmentCreateGuard.report;
      this.createData = data.PunishmentCreateGuard;
      if (this.createData.warn) this.options.push({value: "Warn", label: "Advertencia"});
      if (this.createData.kick) this.options.push({value: "Kick", label: "Expulsión"});
      if (this.createData.tempBan) this.options.push({value: "Ban", label: "Suspensión temporal"});
      if (this.createData.ban) this.options.push({value: "Ban", label: "Suspensión permanente"});
    }));
  }


  changePunishment() {
    let selection: any = this.punishment.type;
    this.selectionLabel = selection.label;
    this.expires = this.selectionLabel === "Suspensión temporal";
    // @ts-ignore
    this.punishment.type = PunishmentType[selection.value];
  }

  clearUser() {
    this.punishment.punished = {} as IUser;
  }

  clearPunishment() {
    this.punishment.type = null;
  }

  onSubmit() {
    if (this.expiration) this.punishment.expires = this.expiration.epoc;

    let has_report = null;
    if (this.report) has_report = this.report.report;

    this._punishmentService.punishmentCreate(this.punishment).subscribe(
      response => {
        if (!response) {
          this._notifierService.notify('error', "Ha ocurrido un error al crear la sanción.");
        } else {
          this._notifierService.notify('success', "Se ha creado la sanción correctamente.");
          this._router.navigate(["/sancion/" + response._id]);
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
