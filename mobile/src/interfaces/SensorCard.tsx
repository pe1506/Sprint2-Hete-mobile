import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Medicao } from "../types";
import { calcularStatus } from "../logic/status";
import { StatusBadge } from "./StatusBadge";

type Props = { medicao: Medicao };

// Cartão que exibe uma leitura completa:
// sensor, tipo, valor + unidade, data e status.
export function SensorCard({ medicao }: Props) {
  const { sensor, valor, data } = medicao;
  const status = calcularStatus(valor);

  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <Text style={styles.nome}>{sensor.nome}</Text>
        <StatusBadge status={status} />
      </View>

      <Text style={styles.tipo}>{sensor.tipo}</Text>

      <View style={styles.linhaValor}>
        <Text style={styles.valor}>{valor}</Text>
        <Text style={styles.unidade}>{sensor.unidade}</Text>
      </View>

      <Text style={styles.data}>{data.toLocaleString("pt-BR")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nome: { fontSize: 17, fontWeight: "700", color: "#1a1a1a", flexShrink: 1 },
  tipo: {
    marginTop: 2,
    fontSize: 13,
    color: "#6b7280",
    textTransform: "capitalize",
  },
  linhaValor: { flexDirection: "row", alignItems: "flex-end", marginTop: 14 },
  valor: { fontSize: 40, fontWeight: "800", color: "#111827", lineHeight: 44 },
  unidade: { fontSize: 18, color: "#6b7280", marginLeft: 6, marginBottom: 6 },
  data: { marginTop: 10, fontSize: 12, color: "#9ca3af" },
});