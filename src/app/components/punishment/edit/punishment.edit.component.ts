import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Punishment} from '../../../models/punishment';
import {PunishmentService} from '../../../services/punishment.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'punishment-edit',
  templateUrl: './punishment.edit.component.html'
})

export class PunishmentEditComponent implements OnInit{

  public punishment_options: any = {};
  public punishment: Punishment;
  public punished_placeholder: any = {};

  constructor(
    private _notifierService: NotifierService,
    private _punishmentService: PunishmentService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.punishment_options = [
      {value: "warn", label: "Advertencia"},
      {value: "kick", label: "Expulsión"},
      {value: "temp-ban", label: "Suspensión temporal"},
      {value: "ban", label: "Suspensión permanente"}
    ];
  }

  ngOnInit() {
    this._route.data.subscribe((data => {
      this.punishment = data.PunishmentEditGuard.punishment_details;
      this.punished_placeholder = data.PunishmentEditGuard.punished_placeholder;
    }));

  }

  onSubmit() {
    this._punishmentService.punishment_update(this.punishment._id, this.punishment).subscribe(
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
