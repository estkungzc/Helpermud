import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AirQualityComponent } from 'src/app/pages/air-quality/air-quality.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'air-quality',      component: AirQualityComponent }

];
