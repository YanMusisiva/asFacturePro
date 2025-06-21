import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import * as MediaLibrary from "expo-media-library";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { captureRef } from "react-native-view-shot";

import Modele1 from "@/components/modelesFactures/modele1";
import Modele2 from "@/components/modelesFactures/modele2";
import Modele3 from "@/components/modelesFactures/modele3";
import Modele4 from "@/components/modelesFactures/modele4";
import Modele5 from "@/components/modelesFactures/modele5";
import Modele6 from "@/components/modelesFactures/modele6";
import Modele7 from "@/components/modelesFactures/modele7";
import Modele8 from "@/components/modelesFactures/modele8";

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
  const { modele } = useLocalSearchParams();
  const [factureEnvoyee, setFactureEnvoyee] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const modeleRef = useRef<View>(null);
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
    if (!status?.granted) {
      requestPermission();
    }
    const fetchFacture = async () => {
      const facturesEnvoyeesRaw = await AsyncStorage.getItem("facturesEnvoyees");
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

  const handleSharePhoto = async () => {
    if (modeleRef.current) {
      try {
        const localUri = await captureRef(modeleRef, {
          format: "jpg",
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
        alert("Image sauvegardée dans la galerie !");
      } catch (error) {
        alert("Erreur lors de la sauvegarde : " + error);
      }
    }
  };

  const handleCopyText = async () => {
    const text = formatFactureToText(factureEnvoyee);
    await Clipboard.setStringAsync(text);
    alert("Texte copié !");
  };

  const handleEnvoyer = () => {
    alert("Facture envoyée !");
    router.push("/total");
  };

  const formatFactureToText = (facture: any) => {
    if (!facture) return "Aucune facture à afficher.";
    const entreprise = facture.entreprise || {};
    const factureIn = facture || {};
    const currency = facture.currency || "EUR";
    const symbol = currencySymbols[currency] || currency;
    return (
      `Entreprise: ${entreprise?.nom || ""}\n` +
      `Client: ${factureIn?.client || ""}\n` +
      `Produit: ${factureIn?.produit || ""}\n` +
      `Montant: ${factureIn?.montant || ""} ${symbol} (${currency})\n` +
      `Signé par: ${userName}`
    );
  };

  let modeleComponent = null;
  if (!factureEnvoyee) {
    modeleComponent = <ThemedText>Aucune facture à afficher.</ThemedText>;
  } else {
    switch (modele) {
      case "1":
        modeleComponent = (
          <Modele1 entreprise={factureEnvoyee.entreprise} facture={factureEnvoyee} />
        );
        break;
      case "2":
        modeleComponent = (
          <Modele2 entreprise={factureEnvoyee.entreprise} facture={factureEnvoyee} />
        );
        break;
      case "3":
        modeleComponent = (
          <Modele3 entreprise={factureEnvoyee.entreprise} facture={factureEnvoyee} />
        );
        break;
      case "4":
        modeleComponent = (
          <Modele4 entreprise={factureEnvoyee.entreprise} facture={factureEnvoyee} />
        );
        break;
      case "5":
        modeleComponent = (
          <Modele5 entreprise={factureEnvoyee.entreprise} facture={factureEnvoyee} />
        );
        break;
      case "6":
        modeleComponent = (
          <Modele6 entreprise={factureEnvoyee.entreprise} facture={factureEnvoyee} />
        );
        break;
      case "7":
        modeleComponent = (
          <Modele7 entreprise={factureEnvoyee.entreprise} facture={factureEnvoyee} />
        );
        break;
      case "8":
        modeleComponent = (
          <Modele8 entreprise={factureEnvoyee.entreprise} facture={factureEnvoyee} />
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
      <View ref={modeleRef} collapsable={false} style={{ flex: 1 }}>
        <ScrollView>{modeleComponent}</ScrollView>
      </View>
      {/* <ThemedText style={{ marginVertical: 12 }}>
        {formatFactureToText(factureEnvoyee)}
      </ThemedText> */}
      <View style={{ marginTop: 24 }}>
        <Button
          title="Envoyer la facture"
          onPress={handleEnvoyer}
          color="#34A853"
        />
        <View style={{ height: 12 }} />
        <Button
          title="Partager en tant photo"
          onPress={handleSharePhoto}
          color="#007AFF"
        />
        <View style={{ height: 12 }} />
        <Button
          title="Copier le texte de la facture"
          onPress={handleCopyText}
          color="#FF9500"
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