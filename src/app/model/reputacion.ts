import { Odontologo } from "./odontologo";
import { Paciente } from "./paciente";

export class Reputacion{
  reputacion_id: number = 0;
  odontologo_id: Odontologo = new Odontologo();
  paciente_id: Paciente = new Paciente();
  comentario: string = "";
  estrellas: number = 0;
}
