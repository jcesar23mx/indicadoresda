import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PersonalComponent } from './personal/personal.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { AdminGuard } from './admin.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
  path: 'home',
  canActivate: [AdminGuard],
  component: HomeComponent,
  children: [
    {
      path: '',
      redirectTo: 'principal',
      pathMatch: 'full',
    },
    {
      path: 'principal',
      canActivate: [AdminGuard],
      component: PrincipalComponent
    },
    {
      path: 'personal',
      canActivate: [AdminGuard],
      component: PersonalComponent
    },
  ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
