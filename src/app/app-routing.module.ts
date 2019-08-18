import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'views/login/login.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from 'views/dashboard/dashboard.component';
import { ParvulariosComponent } from 'views/parvularios/parvularios.component';
import { ApoderadosComponent } from 'views/apoderados/apoderados.component';
import { ParvulosComponent } from 'views/parvulos/parvulos.component';
import { MensajeriaComponent } from 'views/mensajeria/mensajeria.component';

const routes: Routes = [
  {path:'', component: DashboardComponent},
  {path:'login', component: LoginComponent},
  {path:'parvularios',component:ParvulariosComponent},
  {path:'apoderados',component:ApoderadosComponent},
  {path:'parvulos',component:ParvulosComponent},
  {path:'mensajeria',component:MensajeriaComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[ParvulariosComponent,DashboardComponent,ApoderadosComponent,ParvulosComponent]
