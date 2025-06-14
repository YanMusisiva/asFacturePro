import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function CustomHeader({
  onOpenMenu,
}: {
  onOpenMenu: () => void;
}) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEntreprise = async () => {
      const ent = await AsyncStorage.getItem("entreprise");
      if (ent) {
        const entreprise = JSON.parse(ent);
        setImageUri(entreprise.imageUri);
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
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.logo} />
        ) : (
          <Ionicons name="business-outline" size={36} color="#1D3D47" />
        )}
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
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
// This component is a custom header for the app, displaying the company logo or a default icon.
// It also includes a menu button to open the app menu.
