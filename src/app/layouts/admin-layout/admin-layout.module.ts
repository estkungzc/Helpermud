import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxGaugeModule } from 'ngx-gauge';
import { UiSwitchModule } from 'ngx-ui-switch';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AirQualityComponent } from 'src/app/pages/air-quality/air-quality.component';
import { DxBarGaugeModule, DxSelectBoxModule } from 'devextreme-angular';
import { DifferentLocComponent } from 'src/app/pages/different-loc/different-loc.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    NgxGaugeModule,
    UiSwitchModule,
    TabsModule.forRoot(),
    SweetAlert2Module.forRoot(),
    DxBarGaugeModule,
    DxSelectBoxModule
  ],
  declarations: [
    DashboardComponent,
    AirQualityComponent,
    DifferentLocComponent
  ]
})
export class AdminLayoutModule {}
