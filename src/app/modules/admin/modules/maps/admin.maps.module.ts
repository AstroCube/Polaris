import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {EpsilonModule} from "../../../../epsilon.module";
import {AdminMapsRouting} from "./admin.maps.routing";

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        AdminMapsRouting,
        EpsilonModule
    ],
    providers: [
    ]
})
export class AdminMapsModule { }
