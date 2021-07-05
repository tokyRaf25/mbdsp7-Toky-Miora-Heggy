import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { FootComponent } from '../../pages/foot/foot.component';
import { ChangeComponent } from '../../pages/change/change.component';
import { TennisComponent } from '../../pages/tennis/tennis.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FichefootComponent } from 'src/app/pages/fichefoot/fichefoot.component';
// import { ToastrModule } from 'ngx-toastr';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    QRCodeModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    FootComponent,
    TennisComponent,
    ChangeComponent,
    FichefootComponent
  ]
})

export class AdminLayoutModule {}
