import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

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
      <View style={styles.card}>
        <View style={styles.logoWrap}>
          {entreprise?.imageUri ? (
            <Image source={{ uri: entreprise.imageUri }} style={styles.logo} />
          ) : (
            <Ionicons name="business-outline" size={48} color="#007AFF" />
          )}
        </View>
        <ThemedText type="title" style={styles.sectionTitle}>
          Profil Entreprise
        </ThemedText>
        <View style={styles.infoRow}>
          <Ionicons name="pricetag-outline" size={20} color="#007AFF" style={styles.icon} />
          <ThemedText style={styles.infoText}>Nom : <Text style={styles.infoValue}>{entreprise?.nom || "-"}</Text></ThemedText>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={20} color="#007AFF" style={styles.icon} />
          <ThemedText style={styles.infoText}>Adresse : <Text style={styles.infoValue}>{entreprise?.adresse || "-"}</Text></ThemedText>
        </View>
        <View style={styles.divider} />
        <ThemedText type="title" style={styles.sectionTitle}>
          Utilisateur
        </ThemedText>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color="#007AFF" style={styles.icon} />
          <ThemedText style={styles.infoText}>Nom : <Text style={styles.infoValue}>{user?.name || "-"}</Text></ThemedText>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color="#007AFF" style={styles.icon} />
          <ThemedText style={styles.infoText}>Email : <Text style={styles.infoValue}>{user?.email || "-"}</Text></ThemedText>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color="#007AFF" style={styles.icon} />
          <ThemedText style={styles.infoText}>Téléphone : <Text style={styles.infoValue}>{user?.phone || "-"}</Text></ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  logoWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E6F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: "#B3D6FF",
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  sectionTitle: {
    marginBottom: 10,
    marginTop: 8,
    fontWeight: "bold",
    color: "#232f3e",
    fontSize: 20,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
  },
  icon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#232f3e",
  },
  infoValue: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E6E6E6",
    marginVertical: 18,
  },
});