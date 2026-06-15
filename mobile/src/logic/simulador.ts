import { Sensor, Medicao } from "../types";

let proximoId = 1;

// Faixas de valores por tipo de sensor, calibradas para cruzar
// os limites de status (80 e 100) e mostrar os três estados.
const faixas: Record<string, { min: number; max: number }> = {
  temperatura: { min: 45, max: 115 },
  umidade: { min: 35, max: 98 },
  pressao: { min: 60, max: 105 },
  tensao: { min: 70, max: 108 },
};

function valorAleatorio(tipo: string): number {
  const faixa = faixas[tipo] ?? { min: 0, max: 120 };
  const bruto = faixa.min + Math.random() * (faixa.max - faixa.min);
  return Math.round(bruto * 10) / 10;
}

// Gera uma nova leitura simulada para um sensor.
export function gerarMedicao(sensor: Sensor): Medicao {
  return {
    id: proximoId++,
    sensor,
    valor: valorAleatorio(sensor.tipo),
    data: new Date(),
  };
}