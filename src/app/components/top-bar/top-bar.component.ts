import { Component, OnInit } from '@angular/core';
import { AuthService } from "services/auth.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {

  constructor(public authSrv: AuthService) { }

  ngOnInit() {
  }

}
