import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {Title} from '@angular/platform-browser';
import {PunishmentService} from "../../../../services/punishment.service";
import {GLOBAL} from "../../../../services/global";
import {IPunishment} from "../../../../newModels/IPunishment";
import {IAngularMyDpOptions} from "angular-mydatepicker";

@Component({
  selector: 'punishment-edit',
  templateUrl: './punishment.edit.component.html'
})

export class PunishmentEditComponent implements OnInit{

  public punishment: IPunishment;
  public pickerOptions: IAngularMyDpOptions;
  public initialEpoc: number;
  public expiration: string;

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
      todayTxt: 'Hoy',
      sunHighlight: false,
      openSelectorTopOfInput: true,
      minYear: new Date().getFullYear(),
      maxYear: new Date().getFullYear() + 1
    };
  }

  ngOnInit(): void {
    this._titleService.setTitle("Editar sanción - " + GLOBAL.title);
    this._route.data.subscribe((data => {
      this.punishment = data.PunishmentViewGuard;
      if (this.punishment.expires !== -1) {
        const date = new Date(this.punishment.expires * 1000);
        this.initialEpoc = this.punishment.expires;
        // @ts-ignore
        this.punishment.expires = { date: { year: date.getFullYear(), month: date.getMonth(), day: date.getDay() } };
        this.expiration = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
      }
    }));
  }

  dateChange(event): void {
    this.expiration = event.formatted;
    this.initialEpoc = undefined;
  }

  onSubmit(): void {
    const epoc: any = this.punishment.expires;
    if (!this.initialEpoc && this.punishment.expires !== -1) this.punishment.expires = epoc.epoc;
    if (this.initialEpoc) this.punishment.expires = this.initialEpoc;

    this._punishmentService.punishmentUpdate(this.punishment).subscribe(
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
        console.log(error);
        if (error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );

  }

}
