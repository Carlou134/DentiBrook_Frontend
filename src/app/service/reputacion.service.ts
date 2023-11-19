import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reputacion } from '../model/reputacion';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ReputacionService {
  private url = `${base_url}/reputacion`;
  private listaCambio = new Subject<Reputacion[]>();
  constructor(private http:HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');

    return this.http.get<Reputacion[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(reputacion:Reputacion){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, reputacion, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setlist(listaNueva:Reputacion[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Reputacion>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(r:Reputacion) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, r, {
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
}
