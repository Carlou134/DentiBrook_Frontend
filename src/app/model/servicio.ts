import Decimal from "decimal.js";

export class Servicio {
  id: number = 0;
  tipo_servicio: string = "";
  precio: Decimal = new Decimal(0.00);
}
