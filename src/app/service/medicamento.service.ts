import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medicamento } from '../model/medicamento';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private url = `${base_url}/medicamentos`
  private listaCambio = new Subject<Medicamento[]>();

  constructor(private http:HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');

    return this.http.get<Medicamento[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(especialidad:Medicamento){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, especialidad, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setlist(listaNueva:Medicamento[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Medicamento>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(m:Medicamento) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, m, {
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

  buscar(via: string): Observable<Medicamento[]> {
    let token = sessionStorage.getItem('token');

    return this.http.post<Medicamento[]>(`${this.url}/buscar`, { via: via },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      });
  }
}
