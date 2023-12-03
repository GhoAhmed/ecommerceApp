// screens/ProductDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const ProductDetailsScreen = () => {
  const route = useRoute();
  const { product } = route.params;
  const { dispatch } = useCart();

  // Function to handle adding the product to the cart
  const handleAddToCart = (item) => {
    console.log('Adding to cart...', item);
    dispatch({
      type: 'ADD_TO_CART',
      item: {
        id: item.id,
        name: item.name,
        price: item.price,
        image : item.image,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.productImage} source={{ uri: product.image }} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productInventory}>Inventory: {product.inventory}</Text>
      {/* Add more product details as needed */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
  },
  productInventory: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
});

export default ProductDetailsScreen;




