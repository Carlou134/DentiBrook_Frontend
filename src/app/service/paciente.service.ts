import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import {  Paciente} from '../model/pacientes';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private url = `${base_url}/pacientes`;
  private listaCambio = new Subject<Paciente[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Paciente[]>(this.url);
  }
  insert(r: Paciente) {
    return this.http.post(this.url, r);
  }
  setList(listaNueva: Paciente[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {return this.http.get<Paciente>(`${this.url}/${id}`);}

  update(r:Paciente) {return this.http.put(this.url, r);}

  delete(id: number) {return this.http.delete(`${this.url}/${id}`);}
}
