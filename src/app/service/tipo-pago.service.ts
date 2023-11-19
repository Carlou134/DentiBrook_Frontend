import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Tipo_Pago } from '../model/tipo_pago';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {
  private url = `${base_url}/tipodepagos`;
  private listaCambio = new Subject<Tipo_Pago[]>();

  constructor(private http:HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');

    return this.http.get<Tipo_Pago[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(tipoPago: Tipo_Pago){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, tipoPago, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setlist(listaNueva: Tipo_Pago[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Tipo_Pago>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(t:Tipo_Pago) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, t, {
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

  buscar(metodoDePago: string): Observable<Tipo_Pago[]> {
    let token = sessionStorage.getItem('token');

    return this.http.post<Tipo_Pago[]>(`${this.url}/buscar`, { metodoDePago: metodoDePago },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      });
  }
}
