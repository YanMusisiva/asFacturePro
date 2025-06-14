import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function TotalScreen() {
  const [factures, setFactures] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchFactures = async () => {
      const facturesEnvoyeesRaw =
        await AsyncStorage.getItem("facturesEnvoyees");
      const facturesEnvoyees = facturesEnvoyeesRaw
        ? JSON.parse(facturesEnvoyeesRaw)
        : [];
      setFactures(facturesEnvoyees);
      const somme = facturesEnvoyees.reduce(
        (acc: number, f: any) => acc + (parseFloat(f.montant) || 0),
        0
      );
      setTotal(somme);
    };
    fetchFactures();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Espace pour la navigation */}
      <View style={styles.navigationPlaceholder} />

      <ThemedText type="title" style={styles.title}>
        Total des factures envoyées
      </ThemedText>
      <ThemedText style={styles.total}>Montant total : {total} €</ThemedText>
      <ScrollView style={styles.scrollView}>
        {factures.length === 0 ? (
          <ThemedText style={styles.noFactures}>
            Aucune facture envoyée.
          </ThemedText>
        ) : (
          factures.map((f, idx) => (
            <View key={idx} style={styles.factureItem}>
              <MaterialIcons name="assignment" size={24} color="#333" />
              <ThemedText style={styles.factureText}>
                Client : {f.client} | Produit : {f.produit} | Montant :{" "}
                {f.montant} €
              </ThemedText>
            </View>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#A1CEDC",
  },
  navigationPlaceholder: {
    height: 60, // Hauteur de la barre de navigation
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    color: "#2A2A2A",
  },
  total: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
    color: "#2A2A2A",
  },
  scrollView: {
    marginTop: 24,
  },
  noFactures: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
  factureItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  factureText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
});
