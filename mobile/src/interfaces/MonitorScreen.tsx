import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Sensor, Medicao } from "../types";
import { sensores } from "../data/sensores";
import { gerarMedicao } from "../logic/simulador";
import { SensorCard } from "./SensorCard";

// Tela principal: alterna entre sensores e simula leituras.
export function MonitorScreen() {
  const [sensorAtivo, setSensorAtivo] = useState<Sensor>(sensores[0]);
  const [medicao, setMedicao] = useState<Medicao>(() =>
    gerarMedicao(sensores[0])
  );
  const [historico, setHistorico] = useState<Medicao[]>([]);

  // Troca o sensor selecionado e já gera uma leitura para ele.
  function selecionarSensor(sensor: Sensor) {
    setSensorAtivo(sensor);
    setMedicao(gerarMedicao(sensor));
  }

  // Gera uma nova leitura do sensor ativo e guarda a anterior no histórico.
  function novaLeitura() {
    setHistorico((h) => [medicao, ...h].slice(0, 5));
    setMedicao(gerarMedicao(sensorAtivo));
  }

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Monitoramento</Text>
      <Text style={styles.subtitulo}>Selecione um sensor</Text>

      {/* Alternar sensores */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.abas}
      >
        {sensores.map((s) => {
          const ativo = s.id === sensorAtivo.id;
          return (
            <TouchableOpacity
              key={s.id}
              onPress={() => selecionarSensor(s)}
              style={[styles.aba, ativo && styles.abaAtiva]}
            >
              <Text style={[styles.abaTexto, ativo && styles.abaTextoAtivo]}>
                {s.nome}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Leitura atual */}
      <SensorCard medicao={medicao} />

      <TouchableOpacity style={styles.botao} onPress={novaLeitura}>
        <Text style={styles.botaoTexto}>Nova leitura</Text>
      </TouchableOpacity>

      {/* Histórico */}
      {historico.length > 0 && (
        <View style={styles.historico}>
          <Text style={styles.historicoTitulo}>Leituras anteriores</Text>
          {historico.map((m) => (
            <SensorCard key={m.id} medicao={m} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#f3f4f6" },
  conteudo: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 28, fontWeight: "800", color: "#111827" },
  subtitulo: { fontSize: 14, color: "#6b7280", marginTop: 4, marginBottom: 16 },
  abas: { flexGrow: 0, marginBottom: 20 },
  aba: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 999,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  abaAtiva: { backgroundColor: "#111827", borderColor: "#111827" },
  abaTexto: { fontSize: 13, fontWeight: "600", color: "#374151" },
  abaTextoAtivo: { color: "#ffffff" },
  botao: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  botaoTexto: { color: "#ffffff", fontSize: 16, fontWeight: "700" },
  historico: { marginTop: 28 },
  historicoTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 12,
  },
});