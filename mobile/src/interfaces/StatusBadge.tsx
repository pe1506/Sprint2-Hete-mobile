import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Status } from "../types";
import { statusInfo } from "../logic/status";

type Props = { status: Status };

// Selo colorido que representa o status de uma leitura.
export function StatusBadge({ status }: Props) {
  const info = statusInfo[status];
  return (
    <View style={[styles.badge, { backgroundColor: info.fundo }]}>
      <View style={[styles.ponto, { backgroundColor: info.cor }]} />
      <Text style={[styles.texto, { color: info.cor }]}>{info.rotulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  ponto: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  texto: { fontSize: 13, fontWeight: "700" },
});