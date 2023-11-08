import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { herramienta } from '../model/herramienta';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class herramientasService {
  private url = `${base_url}/herramienta`;
  private listaCambio = new Subject<herramienta[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<herramienta[]>(this.url);
  }
  insert(r: herramienta) {
    return this.http.post(this.url, r);
  }
  setList(listaNueva: herramienta[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {return this.http.get<herramienta>(`${this.url}/${id}`);}

  update(r:herramienta) {return this.http.put(this.url, r);}

  delete(id: number) {return this.http.delete(`${this.url}/${id}`);}
}
