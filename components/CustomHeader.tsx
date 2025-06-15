import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomHeader({
  onOpenMenu,
}: {
  onOpenMenu: () => void;
}) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [entrepriseNom, setEntrepriseNom] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEntreprise = async () => {
      const ent = await AsyncStorage.getItem("entreprise");
      if (ent) {
        const entreprise = JSON.parse(ent);
        setImageUri(entreprise.imageUri);
        setEntrepriseNom(entreprise.nom); // Assure-toi que la clé est bien "nom"
      }
    };
    fetchEntreprise();
  }, []);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => router.push("/profil")}
      >
        <View style={styles.logoRow}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.logo} />
          ) : (
            <Ionicons name="business-outline" size={36} color="#1D3D47" />
          )}
          {entrepriseNom && (
            <Text style={styles.entrepriseNom}>{entrepriseNom}</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onOpenMenu}>
        <Ionicons name="menu" size={36} color="#1D3D47" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#A1CEDC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    elevation: 4,
    zIndex: 10,
  },
  logoContainer: {
    borderRadius: 24,
    overflow: "hidden",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  entrepriseNom: {
    marginLeft: 10,
    fontSize: 18,
    color: "#1D3D47",
    fontWeight: "bold",
  },
});
// This code defines a custom header component for a React Native application.
// It includes a logo that can be an image or an icon, displays the company name,
