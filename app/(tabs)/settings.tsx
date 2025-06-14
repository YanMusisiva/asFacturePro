import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, Button, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const handleLogout = async () => {
    // Supprimer toutes les données de l'AsyncStorage
    await AsyncStorage.clear();
    Alert.alert("Déconnexion", "Vous avez été déconnecté.");
    router.replace("/"); // Redirige vers la page d'accueil
  };

  const handleEditEntreprise = () => {
    router.push("/ajouter-entreprise");
  };

  return (
    <View style={styles.container}>
      <Button
        title="Modifier les données d'entreprise"
        color="#007AFF"
        onPress={handleEditEntreprise}
      />
      <View style={{ height: 24 }} />
      <Button title="Se déconnecter" color="#D9534F" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A1CEDC",
  },
});
