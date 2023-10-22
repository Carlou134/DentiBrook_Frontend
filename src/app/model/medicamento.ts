import Decimal from "decimal.js";

export class Medicamento {
  medicamento_id: number = 0;
  nombre: string = "";
  forma_farmaceutica: string = "";
  via: string = "";
  fecha_caducidad: Date = new Date(Date.now());
  precio: Decimal = new Decimal(0.00);
}
