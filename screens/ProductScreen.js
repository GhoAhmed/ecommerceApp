// screens/ProductScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getProducts } from '../services/api'; // Import the API functions
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();
  
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch products from the API
    getProducts()
      .then(data => {
        setProducts(data.products); // Assuming the products array is nested within a 'products' key
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const numColumns = 4; // Number of products in a row

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
  
  const handleProductPress = (item) => {
    // Navigate to ProductDetails screen with the selected product
    navigation.navigate('ProductDetails', { product: item });
  };

  

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productCard}  onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.image }} style={styles.productImage}/>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
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
  productImage: {
    width: 100, // Adjust the width and height based on your design
    height: 100,
    marginBottom: 5,
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