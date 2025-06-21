import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert("Déconnexion", "Vous avez été déconnecté.");
    router.replace("/");
  };

  const handleEditEntreprise = () => {
    router.push("/ajouter-entreprise");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="settings-outline" size={38} color="#007AFF" style={{ marginBottom: 12 }} />
        <Text style={styles.title}>Paramètres</Text>
        <TouchableOpacity style={styles.actionBtn} onPress={handleEditEntreprise} activeOpacity={0.85}>
          <Ionicons name="business-outline" size={22} color="#007AFF" style={{ marginRight: 8 }} />
          <Text style={styles.actionText}>Modifier les données d'entreprise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.logoutBtn]} onPress={handleLogout} activeOpacity={0.85}>
          <Ionicons name="log-out-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={[styles.actionText, { color: "#fff" }]}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 370,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 32,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#232f3e",
    marginBottom: 24,
    textAlign: "center",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F0FF",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 18,
    width: "100%",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#B3D6FF",
  },
  actionText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.2,
  },
  logoutBtn: {
    backgroundColor: "#D9534F",
    borderColor: "#D9534F",
    marginBottom: 0,
  },
});