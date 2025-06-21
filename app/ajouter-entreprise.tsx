import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AjouterEntrepriseScreen() {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission requise",
          "L'accès à la galerie est nécessaire pour choisir une image."
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    } else {
      Alert.alert("Aucune image sélectionnée.");
    }
  };

  const validateFields = () => {
    if (!nom.trim() || !adresse.trim() || !imageUri) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return false;
    }
    return true;
  };

  const handleSave = useCallback(async () => {
    if (!validateFields()) return;

    const entreprise = { nom, adresse, imageUri };

    try {
      await AsyncStorage.setItem("entreprise", JSON.stringify(entreprise));
      Alert.alert("Succès", "Données de l'entreprise enregistrées !");
      router.back();
    } catch (error) {
      Alert.alert("Erreur", "Une erreur s'est produite lors de la sauvegarde.");
      console.error("Erreur de sauvegarde:", error);
    }
  }, [nom, adresse, imageUri]);

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
            <Ionicons name="business-outline" size={36} color="#007AFF" />
          </View>
          <ThemedText type="title" style={styles.title}>
            Ajouter les données d'entreprise
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nom de l'entreprise"
            value={nom}
            onChangeText={setNom}
            placeholderTextColor="#94A3B8"
            accessibilityLabel="Nom de l'entreprise"
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse de l'entreprise"
            value={adresse}
            onChangeText={setAdresse}
            placeholderTextColor="#94A3B8"
            accessibilityLabel="Adresse de l'entreprise"
          />
          <TouchableOpacity style={styles.imageBtn} onPress={pickImage} activeOpacity={0.85}>
            <Ionicons name="image-outline" size={22} color="#007AFF" style={{ marginRight: 8 }} />
            <Text style={styles.imageBtnText}>Choisir une icône (image)</Text>
          </TouchableOpacity>
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="cover"
              accessibilityLabel="Aperçu de l'image sélectionnée"
            />
          )}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
            <Ionicons name="checkmark-circle-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.saveBtnText}>Enregistrer</Text>
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
  imageBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F0FF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#B3D6FF",
  },
  imageBtnText: {
    color: "#007AFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginTop: 14,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#B3D6FF",
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34A853",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 18,
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