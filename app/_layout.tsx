import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";

const tokenKey = "my-jwt";

export default function RootLayout() {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    loading: boolean;
  }>({ token: null, authenticated: null, loading: true });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(tokenKey);
        if (storedToken) {
          setAuthState({ token: storedToken, authenticated: true, loading: false });
        } else {
          setAuthState({ token: null, authenticated: false, loading: false });
        }
      } catch (error) {
        console.error("Error loading token from SecureStore:", error);
        setAuthState({ token: null, authenticated: false, loading: false });
      }
    };
    
    loadToken();
  }, []);

  if (authState.loading) {
    return <LoadingIndicator />;
  }


  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
  	  <Stack.Screen name="userprofile" options={{ headerShown: false }} />

    </Stack>
  );
}

function LoadingIndicator() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
}
