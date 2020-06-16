import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';
import {NotifierService} from 'angular-notifier';
import {Title} from '@angular/platform-browser';
import {IPunishment, IPunishmentCreateData, PunishmentType} from "../../../../newModels/IPunishment";
import {PunishmentService} from "../../../../services/punishment.service";
import {GLOBAL} from "../../../../services/global";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'punishment-create',
  templateUrl: './punishment.create.component.html'
})

export class PunishmentCreateComponent implements OnInit {

  public createData: IPunishmentCreateData;
  public punishment: IPunishment;
  public options: any[];
  public pickerOptions: IMyDpOptions;

  public selectionLabel: string;
  public expiresLabel: string;

  constructor(
    private titleService: Title,
    private notifierService: NotifierService,
    private userService: UserService,
    private punishmentService: PunishmentService,
    private router: Router,
    private route: ActivatedRoute
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
      minYear: new Date().getFullYear(),
      maxYear: new Date().getFullYear() + 1
    };
    this.options = [];
    this.titleService.setTitle("Crear sanción - " + GLOBAL.title);
    this.punishment = {expires: -1} as IPunishment;
    this.punishment.punished = null;
  }

  ngOnInit() {
    this.route.data.subscribe((data => {
      this.createData = data.PunishmentCreateGuard;
      if (this.createData.warn) this.options.push({value: "Warn", label: "Advertencia"});
      if (this.createData.kick) this.options.push({value: "Kick", label: "Expulsión"});
      if (this.createData.tempBan) this.options.push({value: "Ban", label: "Suspensión temporal"});
      if (this.createData.ban) this.options.push({value: "Ban", label: "Suspensión permanente"});
    }));

    if (this.createData.report) {
      this.punishment.punished = this.createData.report.involved;
      this.punishment.reason = this.createData.report.rule;
      this.punishment.evidence = this.createData.report.evidence;
    }

  }

  changePunishment() {
    let selection: any = this.punishment.type;

    if (selection === null) {
      this.selectionLabel = "Ninguno";
      return;
    }

    this.selectionLabel = selection.label;
    this.punishment.expires = -1;
    // @ts-ignore
    this.punishment.type = PunishmentType[selection.value];
  }

  clearUser() {
    this.punishment.punished = null;
    this.createData.users = [];
  }

  clearPunishment() {
    this.punishment.expires = -1;
    this.punishment.type = null;
  }

  updateQuery(event: any) {
    if (event.term.length > 2) {
      this.userService.userListAutocompleteObservable(false, event.term).subscribe(
        user => {
          this.createData.users = user;
        }
      );
    }
  }

  changeDate(event: any) {
    this.expiresLabel = event.formatted;
  }

  onSubmit() {

    if (this.punishment.expires !== -1) {
      const epoc: any = this.punishment.expires;
      this.punishment.expires = epoc.epoc;
    }

    this.punishmentService.punishmentCreate(this.punishment, this.createData.report._id).subscribe(
      response => {
        if (!response) {
          this.notifierService.notify('error', "Ha ocurrido un error al crear la sanción.");
        } else {
          this.notifierService.notify('success', "Se ha creado la sanción correctamente.");
          if (!this.createData.report) {
            this.router.navigate(["/reportar/" + this.createData.report._id]);
          } else {
            this.router.navigate(["/sancion/" + response._id]);
          }
        }
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
