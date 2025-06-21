import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
      style={{ flex: 1, backgroundColor: "#F6F8FA" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="document-text-outline" size={36} color="#007AFF" />
          </View>
          <ThemedText type="title" style={styles.title}>
            Créer une facture
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nom du client"
            value={client}
            onChangeText={setClient}
            placeholderTextColor="#94A3B8"
          />
          <TextInput
            style={styles.input}
            placeholder="Nom du produit"
            value={produit}
            onChangeText={setProduit}
            placeholderTextColor="#94A3B8"
          />
          <TextInput
            style={styles.input}
            placeholder="Montant payé"
            value={montant}
            onChangeText={setMontant}
            keyboardType="numeric"
            placeholderTextColor="#94A3B8"
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
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
            <Ionicons name="checkmark-circle-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.saveBtnText}>Enregistrer la facture</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F6F8FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 370,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 28,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E6F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: "#232f3e",
  },
  input: {
    width: "100%",
    height: 46,
    borderColor: "#B3D6FF",
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 14,
    paddingHorizontal: 14,
    backgroundColor: "#F8FAFC",
    fontSize: 16,
    color: "#232f3e",
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#B3D6FF",
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: "#F8FAFC",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 46,
  },
  pickerItem: {
    fontSize: 16,
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34A853",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    shadowColor: "#34A853",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.2,
  },
});