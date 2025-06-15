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

export default function Modele2({ entreprise, facture }: any) {
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
      <View style={styles.header}>
        {entreprise?.imageUri && (
          <Image source={{ uri: entreprise.imageUri }} style={styles.logo} />
        )}
        <Text style={styles.title}>{entreprise?.nom}</Text>
      </View>
      <Text style={styles.address}>{entreprise?.adresse}</Text>
      <View style={styles.factureDetails}>
        <Text style={styles.label}>Client :</Text>
        <Text style={styles.value}>{facture?.client}</Text>
      </View>
      <View style={styles.factureDetails}>
        <Text style={styles.label}>Produit :</Text>
        <Text style={styles.value}>{facture?.produit}</Text>
      </View>
      <View style={styles.factureDetails}>
        <Text style={styles.label}>Montant :</Text>
        <Text style={styles.value}>
          {facture?.montant} {symbol}{" "}
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
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 8,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    marginLeft: 2,
  },
  factureDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 4,
  },
  label: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  value: {
    color: "#555",
    fontWeight: "500",
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
    marginTop: 10,
  },
  signed: {
    fontStyle: "italic",
    color: "#888",
    fontSize: 15,
  },
});
