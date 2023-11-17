import { Reputacion } from './../model/reputacion';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ReputacionService {
  private url=`${base_url}/reputacion`
  private listaCambio=new Subject<Reputacion[]>()

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Reputacion[]>(this.url);
  }

  insert(rep:Reputacion){
    return this.listaCambio.asObservable();
  }
}
