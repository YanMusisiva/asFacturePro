import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ProfilScreen() {
  const [entreprise, setEntreprise] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const ent = await AsyncStorage.getItem("entreprise");
      setEntreprise(ent ? JSON.parse(ent) : null);
      const userData = await AsyncStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {entreprise?.imageUri && (
        <Image source={{ uri: entreprise.imageUri }} style={styles.logo} />
      )}
      <ThemedText type="title">Profil Entreprise</ThemedText>
      <ThemedText>Nom : {entreprise?.nom}</ThemedText>
      <ThemedText>Adresse : {entreprise?.adresse}</ThemedText>
      <View style={{ height: 24 }} />
      <ThemedText type="title">Utilisateur</ThemedText>
      <ThemedText>Nom : {user?.name}</ThemedText>
      <ThemedText>Email : {user?.email}</ThemedText>
      <ThemedText>Téléphone : {user?.phone}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A1CEDC",
    padding: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
});
