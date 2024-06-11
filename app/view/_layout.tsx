/** @format */

import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="dispute" options={{ headerShown: false }} />
      <Stack.Screen name="transaction" options={{ headerShown: false }} />
      <Stack.Screen name="redeem" options={{ headerShown: false }} />
    </Stack>
  );
}
