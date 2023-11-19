import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Odontologo } from '../model/odontologo';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class OdontologoService {
  private url = `${base_url}/odontologos`;
  private listaCambio = new Subject<Odontologo[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Odontologo[]>(this.url)
  }

}
