import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function AppMenu({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const handleRate = async () => {
    const url = "https://play.google.com/store/apps/details?id=ton.app.id";
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Erreur", "Impossible d'ouvrir le lien.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ouverture du lien :", error);
      Alert.alert("Erreur", "Une erreur s'est produite.");
    }
  };

  const handleQuit = () => {
    Alert.alert("Quitter", "Voulez-vous quitter l'application ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Quitter",
        style: "destructive",
        onPress: () => {
          try {
            BackHandler.exitApp();
          } catch (error) {
            console.error(
              "Erreur lors de la fermeture de l'application :",
              error
            );
          }
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              router.push("/settings");
              onClose();
            }}
          >
            <Ionicons name="settings-outline" size={24} color="#1D3D47" />
            <ThemedText style={styles.menuText}>Paramètres</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleRate}>
            <Ionicons name="star-outline" size={24} color="#FFD700" />
            <ThemedText style={styles.menuText}>Ajouter des étoiles</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleQuit}>
            <Ionicons name="exit-outline" size={24} color="#D9534F" />
            <ThemedText style={styles.menuText}>Quitter l'app</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => Alert.alert("Thème", "Fonctionnalité à implémenter")}
          >
            <Ionicons name="color-palette-outline" size={24} color="#1D3D47" />
            <ThemedText style={styles.menuText}>Changer le thème</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={28} color="#1D3D47" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  overlayTouchable: {
    width: width * 0.5,
    height: "100%",
  },
  menu: {
    width: width * 0.5,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 6,
    height: "100%",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
