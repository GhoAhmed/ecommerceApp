// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import ProductScreen from './ProductScreen';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <NavBar />

      {/* Product List */}
      <ProductScreen />

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Simple Footer</Text>
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

export default HomeScreen;
