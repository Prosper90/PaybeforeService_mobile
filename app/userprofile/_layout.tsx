/** @format */

import { Stack } from "expo-router/stack";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="personal"
        options={{
          headerShown: true,
          headerTitle: "Personal Information",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleAlign: "center",
          headerTintColor: "#000",
        }}
      />
      <Stack.Screen
        name="password"
        options={{
          headerShown: true,
          headerTitle: "Personal Information",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleAlign: "center",
          headerTintColor: "#000",
        }}
      />
      <Stack.Screen
        name="pin"
        options={{
          headerShown: true,
          headerTitle: "Personal Information",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleAlign: "center",
          headerTintColor: "#000",
        }}
      />
    </Stack>
  );
}
