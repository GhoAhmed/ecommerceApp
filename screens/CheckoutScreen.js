// screens/CheckoutScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useCart } from '../context/CartContext';

const CheckoutScreen = () => {
  const { state } = useCart();

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
      style={styles.productImage}
      source={{ uri: item.image }}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
      <Text style={styles.productQuantity}>
        Quantity: {item.quantity}
      </Text>
    </View>
  );
  
  

  const calculateTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  console.log(state.items);
  return (
    <View style={styles.container}>
      <FlatList
        data={state.items}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.proceedButton}>
          <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  productQuantity: {
    fontSize: 14,
    color: 'blue',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
    marginTop: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  proceedButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  proceedButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  productImage: {
    width: 100,
    height: 100, 
    resizeMode: 'cover', 
    marginBottom: 5, 
  },
});

export default CheckoutScreen;
