import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Especialidad } from '../model/especialidad';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private url = `${base_url}/especialidad`
  private listaCambio = new Subject<Especialidad[]>();

  constructor(private http:HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');

    return this.http.get<Especialidad[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(especialidad:Especialidad){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, especialidad, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setlist(listaNueva:Especialidad[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Especialidad>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(e:Especialidad) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, e, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  buscar(nombreEspecialidad: string): Observable<Especialidad[]> {
    let token = sessionStorage.getItem('token');

    return this.http.post<Especialidad[]>(
      `${this.url}/buscar`,
      { nombreEspecialidad: nombreEspecialidad },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
      );
  }
}
