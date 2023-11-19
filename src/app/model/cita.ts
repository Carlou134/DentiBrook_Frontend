import { Odontologo } from "./odontologo";
import { Paciente } from "./paciente";
import { Servicio } from "./servicio";
import { Tipo_Pago } from "./tipo_pago";

export class Cita {
  cita_id: number = 0;
  paciente_id: Paciente = new Paciente();
  odontologo_id: Odontologo = new Odontologo();
  servicio_id: Servicio = new Servicio();
  tipo_pago_id: Tipo_Pago = new Tipo_Pago();
  fecha: Date = new Date(Date.now());
  hora: string = "";
  duracion_en_horas: number = 0;
  motivo: string = "";
  estado: string = "";
  direccion_consultorio: string = "";
  tipo_cita: string = "";
}
