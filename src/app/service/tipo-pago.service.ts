import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Tipo_Pago[]>(this.url);
  }

  insert(tipoPago: Tipo_Pago){
    return this.http.post(this.url, tipoPago);
  }

  setlist(listaNueva: Tipo_Pago[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  listId(id: number) {return this.http.get<Tipo_Pago>(`${this.url}/${id}`);}

  update(t:Tipo_Pago) {return this.http.put(this.url, t);}

  delete(id: number) {return this.http.delete(`${this.url}/${id}`);}
}
