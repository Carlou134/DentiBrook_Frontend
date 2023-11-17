import { Especialidad } from "./especialidad";
import { Users } from "./users";

export class Odontologo {
      odontologo_id: number = 0;
      user_id: Users = new Users();
     especialidad_id: Especialidad= new Especialidad();
     experiencia_laboral_anios: number=0;
     educacion_universitaria: string="";
     historial_pacientes: number=0;
     horario_atencion: string="";
     salario: number=0;
  
}
