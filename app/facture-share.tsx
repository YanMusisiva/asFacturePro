import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { captureRef } from "react-native-view-shot";

import Modele1 from "@/components/modelesFactures/modele1";
import Modele2 from "@/components/modelesFactures/modele2";
import Modele3 from "@/components/modelesFactures/modele3";

// Pour afficher le symbole de la monnaie
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

export default function FactureShareScreen() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const ent = await AsyncStorage.getItem("entreprise");
  //     const factures = await AsyncStorage.getItem("factures");
  //     setEntreprise(ent ? JSON.parse(ent) : null);
  //     const facturesArray = factures ? JSON.parse(factures) : [];
  //     setFacture(
  //       facturesArray.length > 0
  //         ? facturesArray[facturesArray.length - 1]
  //         : null
  //     );
  //   };
  //   fetchData();
  // }, []);
  const { modele } = useLocalSearchParams();
  const [factureEnvoyee, setFactureEnvoyee] = useState(null);
  const [userName, setUserName] = useState("");
  const viewRef = useRef(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();

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

  useEffect(() => {
    if (status === null) {
      requestPermission();
    }

    const fetchFacture = async () => {
      const facturesEnvoyeesRaw =
        await AsyncStorage.getItem("facturesEnvoyees");
      const facturesEnvoyees = facturesEnvoyeesRaw
        ? JSON.parse(facturesEnvoyeesRaw)
        : [];
      setFactureEnvoyee(
        facturesEnvoyees.length > 0
          ? facturesEnvoyees[facturesEnvoyees.length - 1]
          : null
      );
    };
    fetchFacture();
  }, [status]);

  const handleShare = async () => {
    if (viewRef.current) {
      try {
        const localUri = await captureRef(viewRef, {
          format: "jpg",
          quality: 1,
        });

        // Sauvegarder dans la galerie
        await MediaLibrary.saveToLibraryAsync(localUri);
        alert("Image sauvegardée dans la galerie !");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEnvoyer = () => {
    alert("Facture envoyée !");
    router.push("/total");
  };

  const formatFactureToText = ({ facture }: any) => {
    if (!facture) return "Aucune facture à afficher.";
    const entreprise = facture.entreprise || {};
    const factureIn = facture.facture || {};

    const currency = facture.currency || "EUR";
    const symbol = currencySymbols[currency] || currency;

    return `
      Entreprise: ${entreprise.nom}
      Client: ${factureIn.client}
      Produit: ${factureIn.produit}
      Montant: ${factureIn.montant} ${symbol} (${currency})
      Signé par: ${userName}
    `;
  };

  let modeleComponent = null;
  if (!factureEnvoyee) {
    modeleComponent = <ThemedText>Aucune facture à afficher.</ThemedText>;
  } else {
    switch (modele) {
      case "1":
        modeleComponent = (
          <Modele1 entreprise={factureEnvoyee} facture={factureEnvoyee} />
        );
        break;
      case "2":
        modeleComponent = (
          <Modele2 entreprise={factureEnvoyee} facture={factureEnvoyee} />
        );
        break;
      case "3":
        modeleComponent = (
          <Modele3 entreprise={factureEnvoyee} facture={factureEnvoyee} />
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
      <View ref={viewRef} collapsable={false}>
        <ScrollView>{modeleComponent}</ScrollView>
      </View>
      <ThemedText>{formatFactureToText(factureEnvoyee)}</ThemedText>
      <View style={{ marginTop: 24 }}>
        <Button
          title="Envoyer la facture"
          onPress={handleEnvoyer}
          color="#34A853"
        />
        <Button
          title="Partager la facture"
          onPress={handleShare}
          color="#007AFF"
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
