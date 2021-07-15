import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';
import { GuardService } from './creation-foot/guard.service';

export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'membership', pathMatch:'full',canActivate:[GuardService] },
            { path: 'membership', loadChildren: 'app/pages/membership/membership.module#MembershipModule', data: { breadcrumb: 'Membership' } , canActivate:[GuardService] },
            { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' }, canActivate:[GuardService]},
            { path: 'calendar', loadChildren: 'app/pages/calendar/app-calendar.module#AppCalendarModule', data: { breadcrumb: 'Calendar' }, canActivate:[GuardService] },
            { path: 'creation-foot', loadChildren: 'app/pages/creation-foot/foot.module#FootModule', data: { breadcrumb: 'Foot' } , canActivate:[GuardService] },       
            { path: 'creation-tennis', loadChildren: 'app/pages/creation-tennis/tennis.module#TennisModule', data: { breadcrumb: 'Tennis' } , canActivate:[GuardService] },     
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' }, canActivate:[GuardService] },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' }, canActivate:[GuardService] },
            { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
       ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);