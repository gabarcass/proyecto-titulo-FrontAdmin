import { Injectable } from '@angular/core';
import { StorageService } from "./storage.service";
import { Router } from '@angular/router'
import { BackendService } from './backend.service'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  validator
  constructor(private storageSrv: StorageService, private router: Router,private backenSrv:BackendService) { }
  getuserInfo(){

    //post con los datos del usuario
  }

  getSession() {
    return this.storageSrv.get('@session')
  }
  
  login(value:any){
    let obs = this.backenSrv.post(this.backenSrv.baseUrl+'auth/admin',value)
    obs.subscribe(result=>{
      console.log(result['token'])
      if(result['success']){
        this.setSession(result['token'])
        this.router.navigate((['/dashboard']))
      }
      else{
        window.alert("Correo o contraseña equivocada")
      }
    })
  }

  setSession(value: any) {
    this.storageSrv.set('@session',value)
  }

  removeSession() {
    this.storageSrv.remove('@session')
  }
  logout(){
    this.removeSession()
    this.router.navigate(['/login'])

  }
}
