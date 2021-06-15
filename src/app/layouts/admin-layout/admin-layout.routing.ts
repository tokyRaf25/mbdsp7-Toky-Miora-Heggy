import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { FootComponent } from '../../pages/foot/foot.component';
import { FichefootComponent } from '../../pages/fichefoot/fichefoot.component';
import { TennisComponent } from '../../pages/tennis/tennis.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'foot',           component: FootComponent },
    { path: 'tennis',         component: TennisComponent },
    { path: 'fiche-foot',      component: FichefootComponent }
];
