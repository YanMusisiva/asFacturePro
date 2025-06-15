import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import AppMenu from "@/components/AppMenu";
import CustomHeader from "@/components/CustomHeader";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [menuVisible, setMenuVisible] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [checkingUser, setCheckingUser] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (!user && pathname !== "/register") {
        router.replace("/register");
      }
      setCheckingUser(false);
    };
    checkUser();
  }, [pathname]);

  if (!loaded || checkingUser) {
    // Affiche un écran de chargement propre
    return <StatusBar style="auto" />;
  }

  const showHeaderMenu = [
    "/settings",
    "/total",
    "/", // ou "/" selon ta structure
  ].includes(pathname);

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: " rgba(42, 183, 226, 0.56)" }}
          edges={["top", "left", "right"]}
        >
          {/* Affiche la navigation seulement si on n'est pas sur /register */}
          {showHeaderMenu && (
            <>
              <CustomHeader onOpenMenu={() => setMenuVisible(true)} />
              <AppMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
              />
            </>
          )}
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
            <Stack.Screen
              name="facture-share"
              options={{ title: "Envoie reçu" }}
            />
            <Stack.Screen name="register" options={{ title: "Inscription" }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
