import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const CURRENCIES = [
  { label: "Dollar américain (USD)", value: "USD" },
  { label: "Euro (EUR)", value: "EUR" },
  { label: "Franc burundais (FBU)", value: "FBU" },
  { label: "Shilling ougandais (UGX)", value: "UGX" },
  { label: "Franc congolais (FC)", value: "FC" },
  { label: "Livre sterling (GBP)", value: "GBP" },
  { label: "Shilling kényan (KES)", value: "KES" },
  { label: "Franc congolais (CDF)", value: "CDF" },
  { label: "Rand sud-africain (ZAR)", value: "ZAR" },
  { label: "Cedi ghanéen (GHS)", value: "GHS" },
];

export default function CreerFactureScreen() {
  const [client, setClient] = useState("");
  const [produit, setProduit] = useState("");
  const [montant, setMontant] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handleSave = async () => {
    try {
      if (!client || !produit || !montant) {
        Alert.alert("Erreur", "Tous les champs sont obligatoires.");
        return;
      }
      const facture = {
        client,
        produit,
        montant: parseFloat(montant),
        currency,
      };
      const existing = await AsyncStorage.getItem("factures");
      const factures = existing ? JSON.parse(existing) : [];
      factures.push(facture);
      await AsyncStorage.setItem("factures", JSON.stringify(factures));
      Alert.alert("Succès", "Facture enregistrée !");
      setClient("");
      setProduit("");
      setMontant("");
      setCurrency("USD");
      router.push("/modeles-facture");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la facture:", error);
      Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#A1CEDC" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={currency}
            onValueChange={setCurrency}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {CURRENCIES.map((cur) => (
              <Picker.Item
                key={cur.value}
                label={cur.label}
                value={cur.value}
              />
            ))}
          </Picker>
        </View>
        <View style={{ marginTop: 24, width: "100%" }}>
          <Button
            title="Enregistrer la facture"
            onPress={handleSave}
            color="#34A853"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  pickerContainer: {
    width: "100%",
    maxWidth: 350,
    borderWidth: 1,
    borderColor: "#1D3D47",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 44,
  },
  pickerItem: {
    fontSize: 16,
  },
});
