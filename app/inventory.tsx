import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getInventory } from '../service/service';

export interface Inventory {
  productId: number;
  stock: number;
  reservedStock: number;
}

export default function InventoryScreen() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getInventory()
      .then((data: Inventory[]) => {
        setInventory(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  const renderInventory = ({ item }: { item: Inventory }) => (
    <View style={localStyles.inventoryItem} accessibilityLabel={`inventoryItem-${item.productId}`}>
      <Text>
        Product: {item.productId} - Stock: {item.stock} - Reserved Stock: {item.reservedStock}
      </Text>
    </View>
  );

  return (
    <View style={styles.container} accessibilityLabel="warehousePage">
      {loading ? ( // Display loading message while fetching inventory
        <Text accessibilityLabel="loadingMessage">Loading...</Text>
      ) : inventory.length > 0 ? ( // Display inventory if available
        <FlatList
          data={inventory}
          keyExtractor={item => item.productId.toString()}
          renderItem={renderInventory}
          contentContainerStyle={localStyles.inventoryContainer}
          accessibilityLabel="inventoryList"
        />
      ) : ( // Display empty message if inventory is empty
        <Text accessibilityLabel="emptyMessage">This warehouse is empty</Text>
      )}
    </View>
  );
}

// Define local styles
const localStyles = StyleSheet.create({
  inventoryContainer: {
    marginTop: 20,
    width: "100%",
    gap: 10,
  },
  inventoryItem: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});
