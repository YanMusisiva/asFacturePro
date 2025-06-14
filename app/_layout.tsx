import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import AppMenu from "@/components/AppMenu";
import CustomHeader from "@/components/CustomHeader";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useState } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CustomHeader onOpenMenu={() => setMenuVisible(true)} />
      <AppMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="ajouter-entreprise"
          options={{ title: "Ajouter une entreprise" }}
        />
        <Stack.Screen
          name="creer-facture"
          options={{ title: "Ajouter une facture" }}
        />
        <Stack.Screen
          name="modeles-facture"
          options={{ title: "Modèles de facture" }}
        />

        <Stack.Screen name="facture-share" options={{ title: "Envoie reçu" }} />

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
