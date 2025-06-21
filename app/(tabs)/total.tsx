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

const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  FBU: "FBu",
  UGX: "Ugx",
  FC: "FC",
  GBP: "£",
  KES: "KSh",
  CDF: "FC",
  ZAR: "R",
  GHS: "₵",
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
        const currency = f.currency || "EUR";
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
        <MaterialIcons name="summarize" size={28} color="#007AFF" />{" "}
        Total des factures envoyées
      </ThemedText>

      <View style={styles.totauxContainer}>
        {Object.keys(totaux).length === 0 ? (
          <ThemedText style={styles.totalText}>Aucun total à afficher.</ThemedText>
        ) : (
          Object.entries(totaux).map(([currency, total]) => (
            <View style={styles.totalCard} key={currency}>
              <MaterialIcons name="account-balance-wallet" size={24} color="#007AFF" />
              <ThemedText style={styles.totalTextBlue}>
                {total} {currencySymbols[currency] || currency}
              </ThemedText>
            </View>
          ))
        )}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{paddingBottom: 32}}>
        {factures.length === 0 ? (
          <ThemedText style={styles.noFactures}>
            Aucune facture envoyée.
          </ThemedText>
        ) : (
          factures.map((f, idx) => (
            <View key={idx} style={styles.factureItem}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="assignment" size={24} color="#007AFF" />
              </View>
              <View style={{flex: 1}}>
                <ThemedText style={styles.factureClient}>
                  {f.client}
                </ThemedText>
                <ThemedText style={styles.factureProduit}>
                  {f.produit}
                </ThemedText>
                <ThemedText style={styles.factureMontant}>
                  {f.montant} {currencySymbols[f.currency || "EUR"] || f.currency || "€"}
                </ThemedText>
              </View>
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
    padding: 0,
    backgroundColor: "#F6F8FA",
  },
  navigationPlaceholder: {},
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 12,
    textAlign: "center",
    color: "#232f3e",
    backgroundColor: "#fff",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#e3e6e8",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  totauxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 12,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  totalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F0FF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#B3D6FF",
    shadowColor: "#007AFF",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#007AFF",
    marginLeft: 6,
  },
  totalTextBlue: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#007AFF",
    marginLeft: 6,
  },
  scrollView: {
    marginTop: 18,
    paddingHorizontal: 18,
  },
  noFactures: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 32,
  },
  factureItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e3e6e8",
    shadowColor: "#007AFF",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E6F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,borderColor: "#B3D6FF",
  },
  factureClient: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#232f3e",
    marginBottom: 2,
  },
  factureProduit: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 2,
  },
  factureMontant: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold",
  },
});