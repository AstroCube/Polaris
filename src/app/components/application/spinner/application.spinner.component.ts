import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import Typed from 'typed.js';
import {forkJoin, from} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {IHeaderUser} from '../../../newModels/user/IUserProfile';
import {IUser} from "../../../newModels/user/IUser";
import {GroupService} from "../../../services/group.service";

@Component({
  selector: 'spinner',
  templateUrl: './application.spinner.component.html',
  styles: ['.la-line-scale-pulse-out-rapid,.la-line-scale-pulse-out-rapid>div{position:relative;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.la-line-scale-pulse-out-rapid{display:block;font-size:0;color:#fff}.la-line-scale-pulse-out-rapid.la-dark{color:#333}.la-line-scale-pulse-out-rapid>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.la-line-scale-pulse-out-rapid{width:40px;height:32px}.la-line-scale-pulse-out-rapid>div{width:4px;height:32px;margin:2px;margin-top:0;margin-bottom:0;border-radius:0;-webkit-animation:line-scale-pulse-out-rapid .9s infinite cubic-bezier(.11,.49,.38,.78);-moz-animation:line-scale-pulse-out-rapid .9s infinite cubic-bezier(.11,.49,.38,.78);-o-animation:line-scale-pulse-out-rapid .9s infinite cubic-bezier(.11,.49,.38,.78);animation:line-scale-pulse-out-rapid .9s infinite cubic-bezier(.11,.49,.38,.78)}.la-line-scale-pulse-out-rapid>div:nth-child(3){-webkit-animation-delay:-.9s;-moz-animation-delay:-.9s;-o-animation-delay:-.9s;animation-delay:-.9s}.la-line-scale-pulse-out-rapid>div:nth-child(2),.la-line-scale-pulse-out-rapid>div:nth-child(4){-webkit-animation-delay:-.65s;-moz-animation-delay:-.65s;-o-animation-delay:-.65s;animation-delay:-.65s}.la-line-scale-pulse-out-rapid>div:nth-child(1),.la-line-scale-pulse-out-rapid>div:nth-child(5){-webkit-animation-delay:-.4s;-moz-animation-delay:-.4s;-o-animation-delay:-.4s;animation-delay:-.4s}.la-line-scale-pulse-out-rapid.la-sm{width:20px;height:16px}.la-line-scale-pulse-out-rapid.la-sm>div{width:2px;height:16px;margin:1px;margin-top:0;margin-bottom:0}.la-line-scale-pulse-out-rapid.la-2x{width:80px;height:64px}.la-line-scale-pulse-out-rapid.la-2x>div{width:8px;height:64px;margin:4px;margin-top:0;margin-bottom:0}.la-line-scale-pulse-out-rapid.la-3x{width:120px;height:96px}.la-line-scale-pulse-out-rapid.la-3x>div{width:12px;height:96px;margin:6px;margin-top:0;margin-bottom:0}@-webkit-keyframes line-scale-pulse-out-rapid{0%{-webkit-transform:scaley(1);transform:scaley(1)}80%{-webkit-transform:scaley(.3);transform:scaley(.3)}90%{-webkit-transform:scaley(1);transform:scaley(1)}}@-moz-keyframes line-scale-pulse-out-rapid{0%{-moz-transform:scaley(1);transform:scaley(1)}80%{-moz-transform:scaley(.3);transform:scaley(.3)}90%{-moz-transform:scaley(1);transform:scaley(1)}}@-o-keyframes line-scale-pulse-out-rapid{0%{-o-transform:scaley(1);transform:scaley(1)}80%{-o-transform:scaley(.3);transform:scaley(.3)}90%{-o-transform:scaley(1);transform:scaley(1)}}@keyframes line-scale-pulse-out-rapid{0%{-webkit-transform:scaley(1);-moz-transform:scaley(1);-o-transform:scaley(1);transform:scaley(1)}80%{-webkit-transform:scaley(.3);-moz-transform:scaley(.3);-o-transform:scaley(.3);transform:scaley(.3)}90%{-webkit-transform:scaley(1);-moz-transform:scaley(1);-o-transform:scaley(1);transform:scaley(1)}}']
})

export class ApplicationSpinner {
  @Input() public active: boolean = false;
  @Input() public loading: string = 'Cagando...';
}
