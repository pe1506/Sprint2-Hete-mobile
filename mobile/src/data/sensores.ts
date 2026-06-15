import { Sensor } from "../types";

// Sensores simulados do sistema de monitoramento.
export const sensores: Sensor[] = [
  { id: 1, nome: "Temperatura Ambiente", tipo: "temperatura", unidade: "°C" },
  { id: 2, nome: "Umidade do Solo", tipo: "umidade", unidade: "%" },
  { id: 3, nome: "Pressão do Sistema", tipo: "pressao", unidade: "kPa" },
  { id: 4, nome: "Tensão da Bateria", tipo: "tensao", unidade: "V" },
];