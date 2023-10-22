import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Especialidad } from '../model/especialidad';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private url = `${base_url}/especialidad`
  private listaCambio = new Subject<Especialidad[]>();

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Especialidad[]>(this.url);
  }

  insert(especialidad:Especialidad){
    return this.http.post(this.url, especialidad);
  }

  setlist(listaNueva:Especialidad[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }
}
