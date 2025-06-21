import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const currencySymbols: Record<string, string> = {
  USD: "$", EUR: "€", FBU: "FBu", UGX: "USh", FC: "FC", GBP: "£", KES: "KSh", CDF: "FC", ZAR: "R", GHS: "₵",
};

export default function Modele7({ entreprise, facture }: any) {
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 30,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#ff9900",
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  logoBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 18,
    borderWidth: 1,
    borderColor: "#ff9900",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 10,
  },
  company: {
    fontWeight: "bold",
    fontSize: 23,
    color: "#ff9900",
  },
  address: {
    color: "#6b7280",
    fontSize: 14,
    marginTop: 2,
  },
  body: {
    marginBottom: 16,
    backgroundColor: "#fff7ed",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ffedd5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    color: "#ff9900",
    fontSize: 15,
    width: 90,
  },
  value: {
    color: "#232f3e",
    fontSize: 15,
    flexShrink: 1,
    textAlign: "right",
  },
  amount: {
    fontWeight: "bold",
    color: "#232f3e",
    fontSize: 18,
  },
  currency: {
    color: "#ff9900",
    fontSize: 13,
    fontWeight: "normal",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#ff9900",
    paddingTop: 10,
    alignItems: "flex-end",
  },
  signed: {
    fontStyle: "italic",
    color: "#6b7280",
    fontSize: 15,
  },
  user: {
    color: "#ff9900",
    fontWeight: "bold",
  },
});