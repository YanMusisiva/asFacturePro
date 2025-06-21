import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import Modele1 from "@/components/modelesFactures/modele1";
import Modele2 from "@/components/modelesFactures/modele2";
import Modele3 from "@/components/modelesFactures/modele3";
import Modele4 from "@/components/modelesFactures/modele4";
import Modele5 from "@/components/modelesFactures/modele5";
import Modele6 from "@/components/modelesFactures/modele6";
import Modele7 from "@/components/modelesFactures/modele7";
import Modele8 from "@/components/modelesFactures/modele8";

export default function ModelesFactureScreen() {
  const [entreprise, setEntreprise] = useState<any>(null);
  const [facture, setFacture] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const ent = await AsyncStorage.getItem("entreprise");
      const factures = await AsyncStorage.getItem("factures");
      setEntreprise(ent ? JSON.parse(ent) : null);
      const facturesArray = factures ? JSON.parse(factures) : [];
      setFacture(
        facturesArray.length > 0
          ? facturesArray[facturesArray.length - 1]
          : null
      );
    };
    fetchData();
  }, []);

  const handleSelectModele = async (modele: number) => {
    if (!entreprise || !facture) {
      Alert.alert("Erreur", "donnees d'entreprise manquantes.");
      return;
    }
    // Ajoute la facture envoyée dans le tableau "facturesEnvoyees"
    const facturesEnvoyeesRaw = await AsyncStorage.getItem("facturesEnvoyees");
    const facturesEnvoyees = facturesEnvoyeesRaw
      ? JSON.parse(facturesEnvoyeesRaw)
      : [];
    const factureEnvoyee = { ...facture, entreprise, modele };
    facturesEnvoyees.push(factureEnvoyee);
    await AsyncStorage.setItem(
      "facturesEnvoyees",
      JSON.stringify(facturesEnvoyees)
    );

    // Redirige vers la page facture-share avec le modèle choisi
    router.push({
      pathname: "/facture-share",
      params: { modele: modele.toString() },
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={{ marginBottom: 16 }}>
        Choisissez un modèle de facture
      </ThemedText>
      <ScrollView>
        <TouchableOpacity onPress={() => handleSelectModele(1)}>
          <Modele1 entreprise={entreprise} facture={facture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectModele(2)}>
          <Modele2 entreprise={entreprise} facture={facture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectModele(3)}>
          <Modele3 entreprise={entreprise} facture={facture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectModele(4)}>
          <Modele4 entreprise={entreprise} facture={facture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectModele(5)}>
          <Modele5 entreprise={entreprise} facture={facture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectModele(6)}>
          <Modele6 entreprise={entreprise} facture={facture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectModele(7)}>
          <Modele7 entreprise={entreprise} facture={facture} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectModele(8)}>
          <Modele8 entreprise={entreprise} facture={facture} />
        </TouchableOpacity>
       
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#A1CEDC",
  },
});
