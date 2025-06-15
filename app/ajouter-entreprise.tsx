import { ThemedText } from "@/components/ThemedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
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
      style={{ flex: 1, backgroundColor: "#A1CEDC" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText type="title" style={styles.title}>
          Ajouter les données d'entreprise
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Nom de l'entreprise"
          value={nom}
          onChangeText={setNom}
          accessibilityLabel="Nom de l'entreprise"
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse de l'entreprise"
          value={adresse}
          onChangeText={setAdresse}
          accessibilityLabel="Adresse de l'entreprise"
        />
        <Button
          title="Choisir une icône (image)"
          onPress={pickImage}
          color="#007AFF"
          accessibilityLabel="Choisir une image"
        />
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
            accessibilityLabel="Aperçu de l'image sélectionnée"
          />
        )}
        <View style={styles.buttonContainer}>
          <Button title="Enregistrer" onPress={handleSave} color="#34A853" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#A1CEDC",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    width: "100%",
    maxWidth: 350,
    height: 44,
    borderColor: "#1D3D47",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#1D3D47",
  },
  buttonContainer: {
    marginTop: 24,
    width: "100%",
  },
});
