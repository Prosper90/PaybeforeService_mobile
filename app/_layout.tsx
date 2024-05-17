import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, Redirect, useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { ContextProvider, DataContext } from "../utility/context";
import { SuccessPayment } from "../components/SvgItems";
import { NavigationContainer } from "@react-navigation/native";
import SuccessPaymentModal from "../components/SuccessPaymentModal";
import { NotifierRoot, NotifierWrapper } from "react-native-notifier";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    loading: boolean;
  }>({ token: null, authenticated: null, loading: true });
  const { successPayment, setSuccessPayment } = useContext(DataContext);
  // const { authState, setAuthState } = useContext(DataContext);

  useEffect(() => {
    // loadToken();
  }, []);

  return (
    <GestureHandlerRootView>
      <ContextProvider>
        <NotifierWrapper>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
            <Stack.Screen name="userprofile" options={{ headerShown: false }} />
            <Stack.Screen name="withdrawal" options={{ headerShown: false }} />
          </Stack>
          <SuccessPaymentModal />
        </NotifierWrapper>
      </ContextProvider>
    </GestureHandlerRootView>
  );
}

function LoadingIndicator() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
}
