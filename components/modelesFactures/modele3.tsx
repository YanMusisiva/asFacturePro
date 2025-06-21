import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

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
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.logoWrap}>
          {entreprise?.imageUri ? (
            <Image source={{ uri: entreprise.imageUri }} style={styles.logo} />
          ) : (
            <Ionicons name="business-outline" size={44} color="#007AFF" />
          )}
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{entreprise?.nom || "-"}</Text>
          <Text style={styles.subtitle}>{entreprise?.adresse || "-"}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.factureTitle}>Détails de la facture</Text>
        <View style={styles.row}>
          <Ionicons name="person-outline" size={18} color="#007AFF" style={styles.icon} />
          <Text style={styles.label}>Client :</Text>
          <Text style={styles.value}>{facture?.client || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="cube-outline" size={18} color="#007AFF" style={styles.icon} />
          <Text style={styles.label}>Produit :</Text>
          <Text style={styles.value}>{facture?.produit || "-"}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="cash-outline" size={18} color="#34A853" style={styles.icon} />
          <Text style={styles.label}>Montant :</Text>
          <Text style={[styles.value, styles.amount]}>
            {facture?.montant} {symbol}{" "}
            <Text style={styles.currencyCode}>({currency})</Text>
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.signed}>
          <Ionicons name="pencil-outline" size={16} color="#6B7280" /> Signé par :{" "}
          <Text style={styles.userName}>{userName || "-"}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    shadowColor: "#007AFF",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E6E6E6",
    paddingBottom: 14,
    marginBottom: 18,
  },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E6F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1.5,
    borderColor: "#B3D6FF",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 21,
    color: "#232f3e",
    marginBottom: 2,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 14,
  },
  body: {
    marginBottom: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  factureTitle: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 10,
    color: "#007AFF",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontWeight: "bold",
    color: "#007AFF",
    width: 80,
    fontSize: 16,
    marginRight: 4,
  },
  value: {
    color: "#232f3e",
    fontSize: 16,
    flexShrink: 1,
  },
  amount: {
    fontWeight: "bold",
    color: "#34A853",
  },
  currencyCode: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "normal",
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#E6E6E6",
    paddingTop: 10,
    alignItems: "flex-end",
  },
  signed: {
    fontStyle: "italic",
    color: "#6B7280",
    fontSize: 15,
  },
  userName: {
    color: "#007AFF",
    fontWeight: "bold",},})