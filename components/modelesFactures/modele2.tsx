import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Modele2({ entreprise, facture }: any) {
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
        <Text style={styles.value}>{facture?.montant} €</Text>
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
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
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
  },
});
