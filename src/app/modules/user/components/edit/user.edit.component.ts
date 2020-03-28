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
import {NotifierService} from 'angular-notifier';
import {Title} from '@angular/platform-browser';
import {GLOBAL} from '../../../../services/global';
import {UserService} from '../../../../services/user.service';
import * as ClassicEditor from "../../../../../../text_editor";
import {IMailUpdateVerification, IPasswordUpdate, IUser} from '../../../../newModels/user/IUser';
import {IUserProfileDiscord} from '../../../../newModels/user/IUserProfile';

@Component({
  selector: 'user-edit',
  templateUrl: './user.edit.component.html'
})

export class UserEditComponent implements OnInit {

  @ViewChild("popup_close") public account_popup: ElementRef;
  public user: IUser;
  public mailVerification: IMailUpdateVerification;
  public passwordUpdateReq: IPasswordUpdate;
  public discord: IUserProfileDiscord;
  public editor = ClassicEditor;
  public gender_options: any[];
  public labels;
  public url: string;
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
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private notifierService: NotifierService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    if (this.activatedRoute.snapshot.queryParams.discord_verify) this.notifierService.notify('info', "Haz sincronizado tu cuenta de Discord correctamente.");
    this.gender_options = [
      {value: 0, label: "Selecciona un género"},
      {value: 1, label: "Hombre"},
      {value: 2, label: "Mujer"},
      {value: 3, label: "No binario"}
    ];
    this.mailVerification = {} as IMailUpdateVerification;
    this.passwordUpdateReq = {} as IPasswordUpdate;
    this.labels = [' Inútil', ' Pobre', ' Normal', ' Fuerte', ' Muy fuerte'];
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.titleService.setTitle("Mi cuenta - " + GLOBAL.title);
    this.route.data.subscribe((data => {
      this.user = data.UserEditGuard.user;
      this.discord = data.UserEditGuard.discord;
    }));
    if (!this.user.publicInfo.about) this.user.publicInfo.about = "";
  }

  discordLogout(): void {
    this.user.discord = undefined;
    this.discord = undefined;
    this.userService.discord_logout(this.user._id).subscribe(
      response => {
        if(!response.saved) {
          this.notifierService.notify('error', "Ha ocurrido un error al cerrar la sesión de Discord.");
        } else {
          this.notifierService.notify('info', "Tu sesión de Discord se ha cerrado correctamente.");
        }
      },
      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', "Ha ocurrido un error al cerrar la sesión de Discord.");
        }
      }
    )
  }

  openPopup(): void {
    this.userService.mailVerification().subscribe(
      response =>
        this.notifierService.notify('success', "¡Se ha enviado un correo electrónico a " + this.user.email + "!"),
      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', "¡Ha ocurrido un error al enviar el corroe de verificación!");
          this.renderer.selectRootElement(this.account_popup).click();
        }
      }
    );
  }

  formSubmit(): void {
    this.userService.updateUser(this.user).subscribe(
      response => {
        this.notifierService.notify('success', "Se han actualizado los datos del usuario correctamente.");
        this.user  = response;
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', error.error.message);
        }
      }
    );
  }

  emailUpdate(): void {
    this.userService.mailUpdate(this.mailVerification).subscribe(
      response => {
        if (response.updated) {
          this.notifierService.notify('success', "Se ha actualizado tu correo electrónico exitosamente");
          this.mailVerification = {} as IMailUpdateVerification;
          this.renderer.selectRootElement(this.account_popup).click();
        } else {
          this.notifierService.notify('error', "Ha ocurrido un error al actualizar tu correo electrónico.");
        }
      },

      error => {
        let error_message = <any> error;
        if(error_message != null) {
          this.notifierService.notify('error', error.error.message);
        }
      }
    );
  }

  passwordUpdate(): void {
    if (this.passwordUpdateReq.actual !== this.passwordUpdateReq.confirmation) {
      this.notifierService.notify('error', "Las contraseñas ingresadas no concíden.");
    } else if (this.passwordUpdateReq.actual === this.passwordUpdateReq.password) {
      this.notifierService.notify('error', "No puedes cambiar tu contraseña por la misma que tienes.");
    } else {
      this.passwordUpdateReq.confirmation = undefined;
      this.userService.passwordUpdate(this.passwordUpdateReq).subscribe(
        response => {
          this.notifierService.notify('success', "Se ha actualizado la contraseña del jugador.");
          this.passwordUpdateReq = {} as IPasswordUpdate;
        },

        error => {
          let error_message = <any> error;
          if(error_message != null) {
            this.notifierService.notify('error', error.error.message);
          }
        }
      );
    }
  }
}
