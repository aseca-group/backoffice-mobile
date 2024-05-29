import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="orders" options={{ title: "Orders" }} />
      <Stack.Screen name="deliveries" options={{ title: "Deliveries" }} />
      <Stack.Screen name="inventory" options={{ title: "Inventory" }} />
    </Stack>
  );
}
