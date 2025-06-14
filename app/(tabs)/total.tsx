import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function TotalScreen() {
  const [factures, setFactures] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchFactures = async () => {
      const facturesEnvoyeesRaw = await AsyncStorage.getItem(
        "facturesEnvoyees"
      );
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
      <ThemedText type="title" style={{ marginBottom: 16 }}>
        Total des factures envoyées
      </ThemedText>
      <ThemedText style={styles.total}>Montant total : {total} €</ThemedText>
      <ScrollView style={{ marginTop: 24 }}>
        {factures.length === 0 ? (
          <ThemedText>Aucune facture envoyée.</ThemedText>
        ) : (
          factures.map((f, idx) => (
            <View key={idx} style={styles.factureItem}>
              <ThemedText>
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
  total: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  factureItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
  },
});
