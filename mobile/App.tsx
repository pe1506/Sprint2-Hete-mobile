import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { MonitorScreen } from "./src/interfaces/MonitorScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MonitorScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
})