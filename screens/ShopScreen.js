// ShopScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductScreen from './ProductScreen';

const ShopScreen = () => {
  return (
    <View style={styles.container}>
      {/* Product List */}
      <ProductScreen />

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Welcome to my store</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});


export default ShopScreen;
