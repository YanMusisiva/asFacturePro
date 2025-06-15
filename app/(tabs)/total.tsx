import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

type Facture = {
  client: string;
  produit: string;
  montant: number | string;
  currency?: string;
};

export default function TotalScreen() {
  const [factures, setFactures] = useState<Facture[]>([]);
  const [totaux, setTotaux] = useState<{ [currency: string]: number }>({});

  useEffect(() => {
    const fetchFactures = async () => {
      const facturesEnvoyeesRaw =
        await AsyncStorage.getItem("facturesEnvoyees");
      const facturesEnvoyees: Facture[] = facturesEnvoyeesRaw
        ? JSON.parse(facturesEnvoyeesRaw)
        : [];
      setFactures(facturesEnvoyees);

      // Calcul des totaux par monnaie
      const totalParMonnaie: { [currency: string]: number } = {};
      facturesEnvoyees.forEach((f) => {
        const currency = f.currency || "€";
        const montant = parseFloat(f.montant as string) || 0;
        if (!totalParMonnaie[currency]) totalParMonnaie[currency] = 0;
        totalParMonnaie[currency] += montant;
      });
      setTotaux(totalParMonnaie);
    };
    fetchFactures();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.navigationPlaceholder} />

      <ThemedText type="title" style={styles.title}>
        Total des factures envoyées
      </ThemedText>

      {Object.keys(totaux).length === 0 ? (
        <ThemedText style={styles.total}>Aucun total à afficher.</ThemedText>
      ) : (
        Object.entries(totaux).map(([currency, total]) => (
          <ThemedText style={styles.total} key={currency}>
            Montant total : {total} {currency}
          </ThemedText>
        ))
      )}

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
                {f.montant} {f.currency || "€"}
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
    height: 60,
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
    marginBottom: 8,
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
