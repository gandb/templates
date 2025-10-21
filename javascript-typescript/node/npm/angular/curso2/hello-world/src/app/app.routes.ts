import { Routes } from '@angular/router';
import path from 'node:path';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
];

