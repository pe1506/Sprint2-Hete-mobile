import { Status } from "../types";

export function calcularStatus(valor: number): Status {
  if (valor > 100) return "critico";
  if (valor > 80) return "alerta";
  return "normal";
}

export const statusInfo = {
  normal: { rotulo: "Normal", cor: "#1b7f4b", fundo: "#e5f6ec" },
  alerta: { rotulo: "Alerta", cor: "#9a6700", fundo: "#fff4d6" },
  critico: { rotulo: "Critico", cor: "#b3261e", fundo: "#fde7e6" },
};