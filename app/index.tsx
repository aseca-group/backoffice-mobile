import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        title="Orders"
        onPress={() => router.push('orders')}
        accessibilityLabel="ordersButton"
      />
      <Button
        title="Deliveries"
        onPress={() => router.push('deliveries')}
        accessibilityLabel="deliveriesButton"
      />
      <Button
        title="Inventory"
        onPress={() => router.push('inventory')}
        accessibilityLabel="inventoryButton"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
});
