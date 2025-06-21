import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const currencySymbols: Record<string, string> = {
  USD: "$", EUR: "€", FBU: "FBu", UGX: "USh", FC: "FC", GBP: "£", KES: "KSh", CDF: "FC", ZAR: "R", GHS: "₵",
};

export default function Modele5({ entreprise, facture }: any) {
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
        <View style={styles.logoWrap}>
          {entreprise?.imageUri && (
            <Image source={{ uri: entreprise.imageUri }} style={styles.logo} />
          )}
        </View>
        <View>
          <Text style={styles.company}>{entreprise?.nom}</Text>
          <Text style={styles.address}>{entreprise?.adresse}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.label}>Client</Text>
          <Text style={styles.value}>{facture?.client}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Produit</Text>
          <Text style={styles.value}>{facture?.produit}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Montant</Text>
          <Text style={styles.amount}>
            {facture?.montant} {symbol} <Text style={styles.currency}>({currency})</Text>
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.signed}>Signé par : <Text style={styles.user}>{userName}</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7fafc",
    borderRadius: 18,
    padding: 28,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  logoWrap: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 8,
  },
  company: {
    fontWeight: "bold",
    fontSize: 21,
    color: "#111827",
  },
  address: {
    color: "#6b7280",
    fontSize: 13,
    marginTop: 2,
  },
  body: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    color: "#2563eb",
    fontSize: 15,
    width: 90,
  },
  value: {
    color: "#111827",
    fontSize: 15,
    flexShrink: 1,
    textAlign: "right",
  },
  amount: {
    fontWeight: "bold",
    color: "#059669",
    fontSize: 17,
  },
  currency: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "normal",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    paddingTop: 10,
    alignItems: "flex-end",
  },
  signed: {
    fontStyle: "italic",
    color: "#6b7280",
    fontSize: 15,
  },
  user: {
    color: "#059669",
    fontWeight: "bold",
  },
});