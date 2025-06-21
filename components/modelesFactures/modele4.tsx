import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const currencySymbols: Record<string, string> = {
  USD: "$", EUR: "€", FBU: "FBu", UGX: "USh", FC: "FC", GBP: "£", KES: "KSh", CDF: "FC", ZAR: "R", GHS: "₵",
};

export default function Modele4({ entreprise, facture }: any) {
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
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.logoBox}>
          {entreprise?.imageUri && (
            <Image source={{ uri: entreprise.imageUri }} style={styles.logo} />
          )}
        </View>
        <View>
          <Text style={styles.company}>{entreprise?.nom}</Text>
          <Text style={styles.address}>{entreprise?.adresse}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.body}>
        <Text style={styles.label}>Client</Text>
        <Text style={styles.value}>{facture?.client}</Text>
        <Text style={styles.label}>Produit</Text>
        <Text style={styles.value}>{facture?.produit}</Text>
        <Text style={styles.label}>Montant</Text>
        <Text style={styles.amount}>
          {facture?.montant} {symbol} <Text style={styles.currency}>({currency})</Text>
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.signed}>Signé par : <Text style={styles.user}>{userName}</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e3e6e8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  logoBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#f2f4f8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
    borderWidth: 1,
    borderColor: "#e3e6e8",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  company: {
    fontWeight: "700",
    fontSize: 22,
    color: "#232f3e",
  },
  address: {
    color: "#6b7280",
    fontSize: 14,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#e3e6e8",
    marginVertical: 12,
  },
  body: {
    marginBottom: 16,
  },
  label: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 15,
    marginTop: 8,
  },
  value: {
    color: "#232f3e",
    fontSize: 16,
    marginBottom: 2,
  },
  amount: {
    color: "#ff9900",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 2,
  },
  currency: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "normal",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#e3e6e8",
    paddingTop: 10,
    alignItems: "flex-end",
  },
  signed: {
    fontStyle: "italic",
    color: "#6b7280",
    fontSize: 15,
  },
  user: {
    color: "#232f3e",
    fontWeight: "bold",
  },
});