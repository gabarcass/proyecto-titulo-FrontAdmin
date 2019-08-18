import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

// Services
import { BackendService } from './services/backend.service'
import { StorageService } from 'services/storage.service'

import { AppRoutingModule, routingComponents } from './app-routing.module';

// Views
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ParvulariosComponent } from './views/parvularios/parvularios.component';
import { ApoderadosComponent } from './views/apoderados/apoderados.component';
import { ParvulosComponent } from './views/parvulos/parvulos.component';
import { MensajeriaComponent } from './views/mensajeria/mensajeria.component';

// Components
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    routingComponents,
    DashboardComponent,
    ParvulariosComponent,
    MensajeriaComponent,
    ParvulosComponent,
    ApoderadosComponent,
    TopBarComponent,
    FooterComponent,
    MainMenuComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,


  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
