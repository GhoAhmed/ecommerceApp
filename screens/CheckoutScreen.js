// screens/CheckoutScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native'; 

const CheckoutScreen = () => {
  const { state, dispatch } = useCart();
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
        style={styles.productImage}
        source={{ uri: item.image }}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleUpdateQuantity(item.id, -1)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton} onPress={() => handleUpdateQuantity(item.id, 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveProduct(item.id)}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const calculateTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleUpdateQuantity = (productId, quantityChange) => {
    // Update the quantity of a specific product
    const updatedItems = state.items.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + quantityChange) } : item
    );

    dispatch({ type: 'SET_INITIAL_STATE', count: state.count + quantityChange, items: updatedItems });
  };

  const handleRemoveProduct = (productId) => {
    // Remove the product from the cart
    const updatedItems = state.items.filter(item => item.id !== productId);
    dispatch({ type: 'SET_INITIAL_STATE', count: state.count - state.items.find(item => item.id === productId)?.quantity, items: updatedItems });
  };

  const handleClearCart = () => {
    // Dispatch an action to clear the cart
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleProceedToCheckout = () => {
    const total = calculateTotal();
    // Navigate to the PaymentScreen
    navigation.navigate('Payment', total);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.items}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderItem}
      />
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
          <Text style={styles.buttonText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToCheckout}>
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
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  productQuantity: {
    fontSize: 14,
    marginRight: 5,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default CheckoutScreen;
