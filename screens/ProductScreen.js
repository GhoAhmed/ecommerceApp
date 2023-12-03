// screens/ProductScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getProducts } from '../services/api'; // Import the API functions
import { useCart } from '../context/CartContext';

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();

  useEffect(() => {
    // Fetch products from the API
    getProducts()
      .then(data => {
        setProducts(data.products); // Assuming the products array is nested within a 'products' key
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const numColumns = 4; // Number of products in a row

  const handleAddToCart = () => {
    console.log('Adding to cart...');
    dispatch({ type: 'INCREMENT' });
  };
  

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={numColumns}
        />
      ) : (
        <Text>No products available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productCard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    width: '100%', // Adjust the width based on your design
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  addToCartButton: {
    backgroundColor: '#3498db',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default ProductScreen;