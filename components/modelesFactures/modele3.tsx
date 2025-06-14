import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Modele3({ entreprise, facture }: any) {
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
        <Text>Client : {facture?.client}</Text>
        <Text>Produit : {facture?.produit}</Text>
        <Text style={styles.amount}>Montant : {facture?.montant} €</Text>
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
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
  },
  factureTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  amount: {
    fontWeight: "bold",
    color: "#D9534F",
  },
});
