import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BackendService} from './services/backend.service'
import { AuthService } from "services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers:[BackendService]
})
export class AppComponent {
  title = 'Admin';
  constructor(public authService: AuthService, private http: HttpClient,public backendSrv: BackendService) { }


ngOnInit(){
}


}
