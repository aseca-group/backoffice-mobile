import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getDeliveries } from '../service/service';

export interface Delivery {
  id: number;
  date: string;
  status: string;
  addressId: number;
  driverId: number;
}

export default function DeliveriesScreen() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getDeliveries()
      .then((data: Delivery[]) => {
        setDeliveries(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  const renderDelivery = ({ item }: { item: Delivery }) => (
    <View style={localStyles.deliveryItem} accessibilityLabel={`deliveryItem-${item.id}`}>
      <Text>Delivery ID: {item.id}</Text>
      <Text>Date: {new Date(item.date).toLocaleString()}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Address ID: {item.addressId}</Text>
      <Text>Driver ID: {item.driverId}</Text>
    </View>
  );

  return (
    <View style={styles.container} accessibilityLabel="deliveriesScreen">
      {loading ? (
        <Text accessibilityLabel="loadingMessage">Loading...</Text>
      ) : deliveries.length > 0 ? (
        <FlatList
          data={deliveries}
          keyExtractor={item => item.id.toString()}
          renderItem={renderDelivery}
          contentContainerStyle={localStyles.schedulesContainer}
          accessibilityLabel="deliveriesList"
        />
      ) : (
        <Text accessibilityLabel="emptyMessage">No deliveries</Text>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  deliveryItem: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  schedulesContainer: {
    marginTop: 20,
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
