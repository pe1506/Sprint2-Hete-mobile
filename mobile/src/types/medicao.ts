import { Sensor } from "./sensor";

// Uma leitura feita por um sensor em um instante de tempo.
export type Medicao = {
  id: number;
  sensor: Sensor;
  valor: number;
  data: Date;
};