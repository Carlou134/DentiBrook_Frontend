import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Servicio } from '../model/servicio';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private url = `${base_url}/servicios`;
  private listaCambio = new Subject<Servicio[]>();

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Servicio[]>(this.url);
  }

  insert(servicio: Servicio){
    return this.http.post(this.url, servicio);
  }

  setlist(listaNueva: Servicio[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  listId(id: number) {return this.http.get<Servicio>(`${this.url}/${id}`);}

  update(s:Servicio) {return this.http.put(this.url, s);}

  delete(id: number) {return this.http.delete(`${this.url}/${id}`);}

  buscar(precio: string): Observable<Servicio[]> {
    return this.http.post<Servicio[]>(`${this.url}/buscar`, { precio: precio });
  }
}
