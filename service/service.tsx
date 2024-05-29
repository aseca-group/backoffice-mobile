import { Order } from "@/app/orders";
import { Delivery } from "@/app/deliveries";
import { Inventory } from "@/app/inventory";

const url = 'http://control-tower-control-tower-1:8080';

export const getOrders = async () => {
  try {
    const response = await fetch(`${url}/order`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Order[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getDeliveries = async () => {
  try {
    const response = await fetch(`${url}/delivery`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Delivery[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    throw error;
  }
}

export const getInventory = async () => {
  const response = await fetch(`${url}/inventory/`);
  const data: Inventory[] = await response.json();
  return data;
}