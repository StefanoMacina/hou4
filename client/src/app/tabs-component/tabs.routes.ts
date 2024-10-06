import { Routes } from '@angular/router';
import { TabsComponentComponent } from './tabs-component.component';
import { HomePage } from '../home/home.page';
import { SignupComponent } from '../access/signup/signup.component';
import { LoginComponent } from '../access/login/login.component';
import { authGuardGuard } from '../guardian/auth-guard.guard';

export const routes: Routes = [
  {
  path: 'signup',
  component: SignupComponent
  },
  {
    path: 'signin',
    component: LoginComponent
    },
  {
    path: 'app',
    component: TabsComponentComponent,
    canActivate: [authGuardGuard],
    children: [
      {
        path: 'home',
        component : HomePage,
      },
      
    ],
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full',
  },
];