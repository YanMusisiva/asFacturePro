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
  Image,
  StyleSheet,
  TouchableOpacity,
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
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntreprise, setHasEntreprise] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
          <TouchableOpacity
            onPress={() => navigation.navigate("SettingsScreen")}
            style={styles.headerIcon}
            accessibilityLabel="Paramètres"
          >
            <Ionicons name="settings-outline" size={28} color="#007AFF" />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: "#F6F8FA",
          borderBottomWidth: 0,
          shadowColor: "transparent",
        },
      });
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Image source={require("@/assets/icon.png")} style={styles.reactLogo} />
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#F6F8FA", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/icon.png")} style={styles.reactLogo} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Ionicons name="document-text-outline" size={32} color="#007AFF" />
        <ThemedText type="title" style={styles.titleText}>
          Bienvenue sur FacturePro !
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.subtitle}>
          Générez, gérez et envoyez vos factures simplement et rapidement.
        </ThemedText>
        {user && (
          <ThemedText style={styles.userInfo}>
            Connecté en tant que <ThemedText style={styles.userName}>{user.name}</ThemedText>
          </ThemedText>
        )}
      </ThemedView>
      <View style={styles.cardContainer}>
        {!hasEntreprise && (
          <TouchableOpacity
            style={[styles.actionCard, { borderColor: "#34A853" }]}
            onPress={() => router.push("/ajouter-entreprise")}
            activeOpacity={0.85}
          >
            <Ionicons name="business-outline" size={28} color="#34A853" />
            <ThemedText style={styles.cardTitle}>
              Ajouter les données d'entreprise
            </ThemedText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionCard, { borderColor: "#007AFF" }]}
          onPress={() => router.push("/creer-facture")}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle-outline" size={28} color="#007AFF" />
          <ThemedText style={styles.cardTitle}>Créer une facture</ThemedText>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F8FA",
  },
  headerIcon: {
    marginRight: 16,
    padding: 4,
    borderRadius: 20,
  },
  reactLogo: {
    height: 110,
    width: 110,
    marginBottom: 24,
    alignSelf: "center",
    borderRadius: 24,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6E6E6",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 36,
    marginBottom: 12,
    justifyContent: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#232f3e",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 32,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 4,
  },
  userInfo: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  userName: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    elevation: 3,
    shadowColor: "#007AFF",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    minWidth: 140,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#232f3e",
    marginTop: 10,
    textAlign: "center",
  },
});