import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";

type User = { email: string; name: string; phone: string };

type RootStackParamList = {
  HomeScreen: undefined;
  SettingsScreen: undefined;
};

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntreprise, setHasEntreprise] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Recharge l'utilisateur à chaque focus (utile après déconnexion)
  useFocusEffect(
    useCallback(() => {
      const loadUser = async () => {
        const userData = await AsyncStorage.getItem("user");
        setUser(userData ? JSON.parse(userData) : null);
        setIsLoading(false);
      };
      loadUser();

      const checkEntreprise = async () => {
        const data = await AsyncStorage.getItem("entreprise");
        setHasEntreprise(!!data);
      };
      checkEntreprise();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions &&
      navigation.setOptions({
        headerRight: () => (
          <Ionicons
            name="settings-outline"
            size={28}
            color="#1D3D47"
            style={{ marginRight: 16 }}
            onPress={() => navigation.navigate("SettingsScreen")}
          />
        ),
      });
  }, [navigation]);

  const handleRegister = async () => {
    if (!email || !name || !phone) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }
    const newUser = { email, name, phone };
    await AsyncStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Image source={require("@/assets/icon.png")} style={styles.reactLogo} />
        <ActivityIndicator size="large" color="#1D3D47" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Image source={require("@/assets/icon.png")} style={styles.reactLogo} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Téléphone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Button title="S'inscrire" onPress={handleRegister} />
      </View>
    );
  }

  // Affiche la page d’accueil si connecté
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/icon.png")} style={styles.reactLogo} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenue sur FacturePro !</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          Générez, gérez et envoyez vos factures simplement et rapidement.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.rowButtons}>
        {!hasEntreprise && (
          <View style={[styles.buttonContainer, { marginRight: 8 }]}>
            <Button
              title="Ajouter les données d'entreprise"
              onPress={() => router.push("/ajouter-entreprise")}
              color="#34A853"
            />
          </View>
        )}
        <View style={[styles.buttonContainer, { marginLeft: 8 }]}>
          <Button
            title="Créer une facture"
            onPress={() => router.push("/creer-facture")}
            color="#007AFF"
          />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A1CEDC",
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "#1D3D47",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 32,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 32,
    alignItems: "center",
  },
  reactLogo: {
    height: 120,
    width: 120,
    marginBottom: 32,
    alignSelf: "center",
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flex: 1,
  },
});
