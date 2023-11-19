import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Odontologo } from '../model/odontologo';
import { HistorialDTOSum } from '../model/HistorialDTOSum';
import { EstrellasSumDTO } from '../model/EstrellasSumDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class OdontologoService {
  private url = `${base_url}/odontologos`;
  private listaCambio = new Subject<Odontologo[]>();
  constructor(private http:HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');

    return this.http.get<Odontologo[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(odontologo:Odontologo){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, odontologo, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setlist(listaNueva:Odontologo[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Odontologo>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(o:Odontologo) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, o, {
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

  getSuma(): Observable<HistorialDTOSum[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<HistorialDTOSum[]>(`${this.url}/historial`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  getSumaestrellas(): Observable<EstrellasSumDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<EstrellasSumDTO[]>(`${this.url}/estrellas`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
