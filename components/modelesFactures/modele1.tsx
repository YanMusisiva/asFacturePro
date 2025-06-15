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

export default function Modele1({ entreprise, facture }: any) {
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
    <View style={styles.outer}>
      <View style={styles.header}>
        {entreprise?.imageUri && (
          <Image source={{ uri: entreprise.imageUri }} style={styles.logo} />
        )}
        <View style={styles.headerText}>
          <Text style={styles.title}>{entreprise?.nom}</Text>
          <Text style={styles.address}>{entreprise?.adresse}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.label}>Client :</Text>
          <Text style={styles.value}>{facture?.client}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Produit :</Text>
          <Text style={styles.value}>{facture?.produit}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Montant :</Text>
          <Text style={[styles.value, styles.amount]}>
            {facture?.montant} {symbol}{" "}
            <Text style={styles.currencyCode}>({currency})</Text>
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.signed}>Signé par : {userName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: "#f6f8fa",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#d0d7de",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#d0d7de",
    paddingBottom: 12,
    marginBottom: 16,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d0d7de",
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#24292f",
    marginBottom: 2,
  },
  address: {
    color: "#57606a",
    fontSize: 14,
  },
  body: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    color: "#0969da",
    width: 90,
    fontSize: 16,
  },
  value: {
    color: "#24292f",
    fontSize: 16,
    flexShrink: 1,
  },
  amount: {
    fontWeight: "bold",
    color: "#1a7f37",
  },
  currencyCode: {
    color: "#57606a",
    fontSize: 13,
    fontWeight: "normal",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#d0d7de",
    paddingTop: 10,
    alignItems: "flex-end",
  },
  signed: {
    fontStyle: "italic",
    color: "#57606a",
    fontSize: 15,
  },
});
