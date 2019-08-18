import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers:[FormBuilder],
})
export class LoginComponent implements OnInit {
  form
  constructor(private authSrv: AuthService, private router: Router, private fb: FormBuilder){}

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })
  ngOnInit() {}

  login(){
    if (this.loginForm.valid) {
      this.form=this.loginForm.value
      this.authSrv.login(this.form)

    }else{
      window.alert("revise los campos")
    }


  }
}
