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
            { path:'', redirectTo:'client', pathMatch:'full',canActivate:[GuardService] },
            { path: 'client', loadChildren: 'app/pages/membership/membership.module#MembershipModule', data: { breadcrumb: 'client' } , canActivate:[GuardService] },
            { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' }, canActivate:[GuardService]},
            { path: 'point-de-ventes', loadChildren: 'app/pages/calendar/app-calendar.module#AppCalendarModule', data: { breadcrumb: 'point-de-ventes' }, canActivate:[GuardService] },
            { path: 'creation-paris', loadChildren: 'app/pages/creation-foot/foot.module#FootModule', data: { breadcrumb: 'creation-paris' } , canActivate:[GuardService] },       
            { path: 'creation-categorie-champ', loadChildren: 'app/pages/creation-tennis/tennis.module#TennisModule', data: { breadcrumb: 'creation-categorie-champ' } , canActivate:[GuardService] },     
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' }, canActivate:[GuardService] },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' }, canActivate:[GuardService] },
            { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
       ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);