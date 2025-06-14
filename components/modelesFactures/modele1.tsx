// filepath: c:\ReactNative\facturePro\components\modelesFactures\modele1.tsx
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Modele1({ entreprise, facture }: any) {
  return (
    <View style={styles.container}>
      {entreprise?.imageUri && (
        <Image source={{ uri: entreprise.imageUri }} style={styles.logo} />
      )}
      <Text style={styles.title}>{entreprise?.nom}</Text>
      <Text>{entreprise?.adresse}</Text>
      <Text>Client : {facture?.client}</Text>
      <Text>Produit : {facture?.produit}</Text>
      <Text>Montant : {facture?.montant} €</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: "center",
    elevation: 2,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
});
