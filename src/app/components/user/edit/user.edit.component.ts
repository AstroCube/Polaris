import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {
  faColumns,
  faEnvelope,
  faFingerprint,
  faKeyboard,
  faMarker,
  faShareSquare,
  faStar,
  faTimes,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {faDiscord, faReddit, faSteam, faTwitch, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {NotifierService} from 'angular-notifier';
import {GLOBAL} from '../../../services/global';
import * as ClassicEditor from "../../../../../text_editor";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'user-edit',
  templateUrl: './user.edit.component.html'
})

export class UserEditComponent implements OnInit {

  @ViewChild("popup_close") public account_popup: ElementRef;
  public actual_password: string;
  public confirm_password: string;
  public discord: any;
  public editor = ClassicEditor;
  public gender_options: any[];
  public labels;
  public new_email: string;
  public new_password: string;
  public own: boolean;
  public url: string;
  public user: User;
  public verification_code: number;
  faColumns = faColumns;
  faDiscord = faDiscord;
  faEnvelope = faEnvelope;
  faFingerprint = faFingerprint;
  faKeyboard = faKeyboard;
  faMarker = faMarker;
  faReddit = faReddit;
  faShareSquare = faShareSquare;
  faStar = faStar;
  faSteam = faSteam;
  faTimes = faTimes;
  faTwitch = faTwitch;
  faTwitter = faTwitter;
  faUser = faUser;

  constructor(
    private _titleService: Title,
    private _activatedRoute: ActivatedRoute,
    private _notifierService: NotifierService,
    private _renderer: Renderer2,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.user = new User("", "", "", "", "", null, "", "", "", 0, 0, false, [], "", "", "", "", "", "", "", "", "", "", "", false, false, false, false, false);
    this.discord = {};
    this.gender_options = [
      {value: 0, label: "Selecciona un género"},
      {value: 1, label: "Hombre"},
      {value: 2, label: "Mujer"},
      {value: 3, label: "No binario"}
    ];
    this.labels = [' Inútil', ' Pobre', ' Normal', ' Fuerte', ' Muy fuerte'];
    this.url = GLOBAL.url;
    this.own = false;
  }

  ngOnInit(): void {
    this._titleService.setTitle("Mi cuenta - " + GLOBAL.title);
    this._route.data.subscribe((data => {
      this.user = data.UserEditGuard.user;
      console.log(data.UserEditGuard.user);
      this.own = data.UserEditGuard.own;
    }));
    this._userService.discord_placeholder(this.user._id).then(response => {
      this.discord.avatar = response.avatar;
      this.discord.username = response.username;
    });
    if (this._activatedRoute.snapshot.queryParams.discord_verify) this._notifierService.notify('info', "Haz sincronizado tu cuenta de Discord correctamente.");
    if (!this.user.about) this.user.about = "";
  }

  discordLogout(): void {
    this.user.discord = undefined;
    this.discord = undefined;
    this._userService.discord_logout(this.user._id).subscribe(
      response => {
        if(!response.saved) {
          this._notifierService.notify('error', "Ha ocurrido un error al cerrar la sesión de Discord.");
        } else {
          this._notifierService.notify('info', "Tu sesión de Discord se ha cerrado correctamente.");
        }
      },
      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', "Ha ocurrido un error al cerrar la sesión de Discord.");
        }
      }
    )
  }

  openPopup(): void {
    this._userService.mail_verification(this.user._id).subscribe(
      response => {
        if (response.email_sent) {
          this._notifierService.notify('success', "¡Se ha enviado un correo electrónico a " + this.user.email + "!");
        } else if (response.already_sent) {
          this._notifierService.notify('warning', "Ya se ha enviado anteriormente un correo de verificación");
        } else {
          this._notifierService.notify('error', "Ha ocurrido un error al enviar el correo electrónico.");
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', "Ha ocurrido un error al iniciar sesión.");
        }
      }
    );
  }

  formSubmit(): void {
    this._userService.update_user(this.user._id, this.user).subscribe(
      response => {
        if(!response.user) {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar los datos del usuario.");
        } else {
          this._notifierService.notify('success', "Se han actualizado los datos del usuario correctamente.");
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }

  emailUpdate(): void {
    let request = {
      verification: this.verification_code, email: this.new_email
    };
    this._userService.mail_update(request).subscribe(
      response => {
        if (response.updated) {
          this._notifierService.notify('success', "Se ha actualizado tu correo electrónico exitosamente");
          this.user.email = this.new_email;
          this.new_email = "";
          this.verification_code = null;
          this._renderer.selectRootElement(this.account_popup).click();
        } else {
          this._notifierService.notify('error', "Ha ocurrido un error al actualizar tu correo electrónico.");
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this._notifierService.notify('error', error.error.message);
        }
      }
    );
  }

  passwordUpdate(): void {
    let request = {
      new_password: this.new_password,
      actual_password: this.actual_password
    };
    if (this.new_password != this.confirm_password) {
      this._notifierService.notify('error', "Las contraseñas ingresadas no concíden.");
    } else {
      this._userService.password_update(request).subscribe(
        response => {
            if (response.updated) {
              this._notifierService.notify('success', "Se ha actualizado la contraseña del jugador.");
            } else {
              this._notifierService.notify('error', "Ha ocurrido un error al actualizar los datos del jugador.");
            }
          },

        error => {
            let error_message = <any> error;
            if(error_message != null) {
              this._notifierService.notify('error', error.error.message);
            }
          }
      );
    }
  }
}
