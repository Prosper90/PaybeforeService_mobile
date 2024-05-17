/** @format */

import { Stack } from "expo-router/stack";

export default function WithdrawalLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="amount"
        options={{
          headerShown: true,
          headerTitle: "Withdraw",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleAlign: "center",
          headerTintColor: "#000",
        }}
      />
      <Stack.Screen
        name="choose"
        options={{
          headerShown: true,
          headerTitle: "Choose",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          // headerShadowVisible: false,

          // presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="saved"
        options={{
          headerShown: true,
          headerTitle: "Saved",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          // headerShadowVisible: false,
          // presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="bankDetails"
        options={{
          headerShown: true,
          headerTitle: "Bank Details",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          // headerShadowVisible: false,
          // presentation: 'modal',
        }}
      />

      <Stack.Screen
        name="confirm"
        options={{
          headerShown: true,
          headerTitle: "Confirm",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          // headerShadowVisible: false,
          // presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="otp"
        options={{
          headerShown: true,
          headerTitle: "Otp",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          // headerShadowVisible: false,
          // presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="complete"
        options={{
          headerShown: true,
          headerTitle: "Complete",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          // headerShadowVisible: false,
          // presentation: 'modal',
        }}
      />
    </Stack>
  );
}
