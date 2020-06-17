import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EpsilonModule} from '../../epsilon.module';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {RouterModule} from '@angular/router';
import {ApplicationPrivacyComponent} from "./components/privacy/application.privacy.component";
import {ApplicationLoginComponent} from "./components/login/application.login.component";
import {ApplicationHomepageComponent} from "./components/homepage/application.homepage.component";
import {ApplicationHeaderComponent} from "./components/header/application.header.component";
import {ApplicationFooterComponent} from "./components/footer/application.footer.component";
import {ApplicationErrorComponent} from "./components/error/application.error.component";
import {ApplicationDonationComponent} from "./components/donation/application.donation.component";
import {ApplicationDevelopementComponent} from "./components/developement/application.developement.component";
import {ApplicationAlertComponent} from "./components/alert/application.alert.component";
import {ApplicationLoginGuard} from "./guards/application.login.guard";
import {ApplicationDevelopementGuard} from "./guards/application.developement.guard";
import {ApplicationHomepageGuard} from "./guards/application.homepage.guard";
import {ApplicationRefundComponent} from "./components/refund/application.refund.component";
import {ApplicationRulesComponent} from "./components/rules/application.rules.component";
import {ApplicationTermsComponent} from "./components/terms/application.terms.component";

@NgModule({
  declarations: [
    ApplicationAlertComponent,
    ApplicationDevelopementComponent,
    ApplicationRefundComponent,
    ApplicationRulesComponent,
    ApplicationTermsComponent,
    ApplicationDonationComponent,
    ApplicationErrorComponent,
    ApplicationFooterComponent,
    ApplicationHeaderComponent,
    ApplicationHomepageComponent,
    ApplicationLoginComponent,
    ApplicationPrivacyComponent
  ],
  imports: [
    CommonModule,
    EpsilonModule,
    FormsModule,
    MomentModule,
    RouterModule
  ],
  exports: [
    ApplicationHeaderComponent,
    ApplicationFooterComponent
  ],
  providers: [
    ApplicationLoginGuard,
    ApplicationDevelopementGuard,
    ApplicationHomepageGuard
  ]
})
export class ApplicationModule { }
