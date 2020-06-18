import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplicationLoginComponent} from "./components/login/application.login.component";
import {ApplicationLoginGuard} from "./guards/application.login.guard";
import {ApplicationHomepageComponent} from "./components/homepage/application.homepage.component";
import {ApplicationHomepageGuard} from "./guards/application.homepage.guard";
import {ApplicationDonationComponent} from "./components/donation/application.donation.component";
import {ApplicationPrivacyComponent} from "./components/privacy/application.privacy.component";
import {ApplicationRulesComponent} from "./components/rules/application.rules.component";
import {ApplicationRefundComponent} from "./components/refund/application.refund.component";
import {ApplicationTermsComponent} from "./components/terms/application.terms.component";
import {ApplicationErrorComponent} from "./components/error/application.error.component";
import {ApplicationAlertComponent} from "./components/alert/application.alert.component";
import {ApplicationDevelopementComponent} from "./components/developement/application.developement.component";
import {ApplicationDevelopementGuard} from "./guards/application.developement.guard";


const routes: Routes = [
  {path: 'login', component: ApplicationLoginComponent, canActivate: [ApplicationLoginGuard]},
  {path: 'registrarse', component: ApplicationLoginComponent, canActivate: [ApplicationLoginGuard]},
  {path: 'donaciones', component: ApplicationDonationComponent},
  {path: 'privacidad', component: ApplicationPrivacyComponent},
  {path: 'reglas', component: ApplicationRulesComponent},
  {path: 'reembolsos', component: ApplicationRefundComponent},
  {path: 'desarrollo', component: ApplicationDevelopementComponent, resolve: {ApplicationDevelopementGuard}},
  {path: 'alertas', component: ApplicationAlertComponent},
  {path: 'terminos', component: ApplicationTermsComponent},
  {path: 'error', component: ApplicationErrorComponent},
  {path: '', component: ApplicationHomepageComponent, resolve: {ApplicationHomepageGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRouting { }
