import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MomentModule} from 'ngx-moment';
import {ValueOfPipe} from './pipes/ValueOf.pipe';
import {NoSanitizePipe} from './pipes/NoSanitize.pipe';
import {TooltipDirective} from './directives/tooltip.directive';
import {BodyDirective} from './directives/body.directive';
import {ClassifierDirective} from './directives/classifier.directive';
import {CollapsibleDirective} from './directives/collapsible.directive';
import {ColorDirective} from './directives/color.directive';
import {NavbarDropdownDirective} from './directives/navbar.dropdown.directive';
import {NavbarResponsiveDirective} from './directives/navbar.responsive.directive';
import {PopupDirective} from './directives/popup.directive';
import {ProfileDropdownDirective} from './directives/profile.dropdown.directive';
import {ScrollbarDirective} from './directives/scrollbar.directive';
import {SliderDirective} from './directives/slider.directive';
import {TabDirective} from './directives/tab.directive';
import {ParseDatePipe} from "./pipes/ParseDate.pipe";
import {ApplicationPaginationComponent} from "./modules/application/components/pagination/application.pagination.component";
import {ApplicationSpinner} from "./modules/application/components/spinner/application.spinner.component";

@NgModule({
  declarations: [
    ApplicationPaginationComponent,
    ApplicationSpinner,
    BodyDirective,
    ClassifierDirective,
    CollapsibleDirective,
    ColorDirective,
    NavbarDropdownDirective,
    NavbarResponsiveDirective,
    PopupDirective,
    ProfileDropdownDirective,
    ScrollbarDirective,
    SliderDirective,
    TabDirective,
    ValueOfPipe,
    TooltipDirective,
    ParseDatePipe,
    NoSanitizePipe
  ],
    imports: [
      CommonModule,
      MomentModule
    ],
  exports: [
    BodyDirective,
    ClassifierDirective,
    CollapsibleDirective,
    ColorDirective,
    NavbarDropdownDirective,
    NavbarResponsiveDirective,
    PopupDirective,
    ProfileDropdownDirective,
    ScrollbarDirective,
    SliderDirective,
    TabDirective,
    ValueOfPipe,
    TooltipDirective,
    NoSanitizePipe,
    ParseDatePipe,
    ApplicationPaginationComponent,
    ApplicationSpinner
  ]
})
export class EpsilonModule { }
