import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getOrders } from '../service/service';

export interface Order {
  id: number;
  productsId: {
    productId: number;
    qty: number;
  }[];
  addressId: number;
  customerId: number;
  total: number;
  deliveryId: number;
  date: string;
}

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    getOrders()
      .then((data: Order[]) => {
        setOrders(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error: any) => {
        console.log(error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);


  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
      accessibilityLabel={`orderItem-${item.id}`}
    >
      <View style={localStyles.orderItem}>
        <Text>Delivery ID: {item.deliveryId}</Text>
        <Text>Customer ID: {item.customerId}</Text>
        <Text>Total: {item.total}</Text>
        <Text>Date: {new Date(item.date).toLocaleString()}</Text>
        <View style={localStyles.productsContainer}>
          {item.productsId.map(product => (
            <View key={product.productId} style={localStyles.productItem}>
              <Text>Product ID: {product.productId}</Text>
              <Text>Quantity: {product.qty}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container} accessibilityLabel='storeScreen'>
      {loading ? ( // Display loading message while fetching orders
        <Text>Loading...</Text>
      ) : orders.length > 0 ? ( // Display orders if available
        <FlatList
          data={orders}
          keyExtractor={item => item.id.toString()}
          renderItem={renderOrder}
          contentContainerStyle={localStyles.ordersContainer}
        />
      ) : ( // Display empty message if no orders fetched
        <Text>No orders</Text>
      )}
    </View>
  );
}

// Define local styles
const localStyles = StyleSheet.create({
  ordersContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  orderItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  productsContainer: {
    marginTop: 10,
    gap: 10,
  },
  productItem: {
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
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
