import { Users } from "./users";

export class Paciente{
  id_paciente: number = 0;
  user_id: Users = new Users();
  contacto_emergencia: string = "";
}
