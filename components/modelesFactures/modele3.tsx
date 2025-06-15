import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

// Pour afficher le symbole de la monnaie
const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  FBU: "FBu",
  UGX: "USh",
  FC: "FC",
  GBP: "£",
  KES: "KSh",
  CDF: "FC",
  ZAR: "R",
  GHS: "₵",
};

export default function Modele3({ entreprise, facture }: any) {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const userRaw = await AsyncStorage.getItem("user");
      if (userRaw) {
        const user = JSON.parse(userRaw);
        setUserName(user.name || "");
      }
    };
    fetchUser();
  }, []);

  const currency = facture?.currency || "EUR";
  const symbol = currencySymbols[currency] || currency;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {entreprise?.imageUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: entreprise.imageUri }} style={styles.logo} />
          </View>
        )}
        <Text style={styles.title}>{entreprise?.nom}</Text>
        <Text style={styles.subtitle}>{entreprise?.adresse}</Text>
      </View>
      <View style={styles.factureContainer}>
        <Text style={styles.factureTitle}>Détails de la Facture</Text>
        <Text>
          <Text style={styles.label}>Client :</Text> {facture?.client}
        </Text>
        <Text>
          <Text style={styles.label}>Produit :</Text> {facture?.produit}
        </Text>
        <Text style={styles.amount}>
          Montant : {facture?.montant} {symbol}{" "}
          <Text style={styles.currencyCode}>({currency})</Text>
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.signed}>Signé par : {userName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
  },
  factureContainer: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 10,
  },
  factureTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    color: "#007AFF",
  },
  label: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  amount: {
    fontWeight: "bold",
    color: "#D9534F",
    marginTop: 4,
  },
  currencyCode: {
    color: "#888",
    fontSize: 13,
    fontWeight: "normal",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
    alignItems: "flex-end",
  },
  signed: {
    fontStyle: "italic",
    color: "#888",
    fontSize: 15,
  },
});
