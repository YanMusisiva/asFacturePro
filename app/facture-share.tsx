import Modele1 from "@/components/modelesFactures/modele1";
import Modele2 from "@/components/modelesFactures/modele2";
import Modele3 from "@/components/modelesFactures/modele3";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, View } from "react-native";

export default function FactureShareScreen() {
  const { modele } = useLocalSearchParams();
  const [factureEnvoyee, setFactureEnvoyee] = useState<any>(null);

  useEffect(() => {
    const fetchFacture = async () => {
      const facturesEnvoyeesRaw = await AsyncStorage.getItem(
        "facturesEnvoyees"
      );
      const facturesEnvoyees = facturesEnvoyeesRaw
        ? JSON.parse(facturesEnvoyeesRaw)
        : [];
      // On prend la dernière facture envoyée
      setFactureEnvoyee(
        facturesEnvoyees.length > 0
          ? facturesEnvoyees[facturesEnvoyees.length - 1]
          : null
      );
    };
    fetchFacture();
  }, []);

  const handleEnvoyer = () => {
    Alert.alert("Facture envoyée !", "Votre facture a bien été envoyée.");
    router.push("/total"); // Redirige vers la page du total
  };

  let modeleComponent = null;
  if (!factureEnvoyee) {
    modeleComponent = <ThemedText>Aucune facture à afficher.</ThemedText>;
  } else {
    switch (modele) {
      case "1":
        modeleComponent = (
          <Modele1
            entreprise={factureEnvoyee.entreprise}
            facture={factureEnvoyee}
          />
        );
        break;
      case "2":
        modeleComponent = (
          <Modele2
            entreprise={factureEnvoyee.entreprise}
            facture={factureEnvoyee}
          />
        );
        break;
      case "3":
        modeleComponent = (
          <Modele3
            entreprise={factureEnvoyee.entreprise}
            facture={factureEnvoyee}
          />
        );
        break;
      default:
        modeleComponent = <ThemedText>Modèle inconnu.</ThemedText>;
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={{ marginBottom: 16 }}>
        Aperçu de la facture
      </ThemedText>
      <ScrollView>{modeleComponent}</ScrollView>
      <View style={{ marginTop: 24 }}>
        <Button
          title="Envoyer la facture"
          onPress={handleEnvoyer}
          color="#34A853"
        />
      </View>
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
