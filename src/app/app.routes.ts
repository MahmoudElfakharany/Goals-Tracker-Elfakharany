import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicGoalsComponent } from './features/public-goals/public-goals.component';

export const routes: Routes = [
  //   {
  //     path: '',
  //     loadChildren: () =>
  //       import('./features/dashboard/dashboard.routes').then((m) => m.routes),
  //   },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  {
    path: 'public-goals',
    component: PublicGoalsComponent,
  },
  //   {
  //     path: 'public-goals',
  //     loadChildren: () =>
  //       import('./features/public/public.routes').then((m) => m.routes),
  //   },
  { path: '**', redirectTo: '' },
];
