
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl ='http://localhost:9000/'



  public get(url: string): Observable<any> {
    return this.http.get(url)
  }
 
  public post (url ,json): Observable<any> {
    return this.http.post(url, json)
  }

  public put(url,json): Observable<any>{
    return this.http.put(url,json)
  }
  public del(url,json): Observable<any>{
    return this.http.delete(url,json)
  }
  constructor(private http: HttpClient) { }
}

