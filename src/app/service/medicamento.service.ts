import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Medicamento[]>(this.url);
  }

  insert(especialidad:Medicamento){
    return this.http.post(this.url, especialidad);
  }

  setlist(listaNueva:Medicamento[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  listId(id: number) {return this.http.get<Medicamento>(`${this.url}/${id}`);}

  update(m:Medicamento) {return this.http.put(this.url, m);}

  delete(id: number) {return this.http.delete(`${this.url}/${id}`);}
}
