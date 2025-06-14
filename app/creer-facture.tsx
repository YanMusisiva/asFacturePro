import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

export default function CreerFactureScreen() {
  const [client, setClient] = useState("");
  const [produit, setProduit] = useState("");
  const [montant, setMontant] = useState("");

  const handleSave = async () => {
    try {
      if (!client || !produit || !montant) {
        Alert.alert("Erreur", "Tous les champs sont obligatoires.");
        return;
      }
      const facture = { client, produit, montant: parseFloat(montant) };
      const existing = await AsyncStorage.getItem("factures");
      const factures = existing ? JSON.parse(existing) : [];
      factures.push(facture);
      await AsyncStorage.setItem("factures", JSON.stringify(factures));
      Alert.alert("Succès", "Facture enregistrée !");
      setClient("");
      setProduit("");
      setMontant("");
      router.push("/modeles-facture");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la facture:", error);
      Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Créer une facture
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Nom du client"
        value={client}
        onChangeText={setClient}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom du produit"
        value={produit}
        onChangeText={setProduit}
      />
      <TextInput
        style={styles.input}
        placeholder="Montant payé"
        value={montant}
        onChangeText={setMontant}
        keyboardType="numeric"
      />
      <View style={{ marginTop: 24, width: "100%" }}>
        <Button
          title="Enregistrer la facture"
          onPress={handleSave}
          color="#34A853"
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A1CEDC",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    width: "100%",
    maxWidth: 350,
    height: 44,
    borderColor: "#1D3D47",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
});
