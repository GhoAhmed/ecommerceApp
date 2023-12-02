// components/NavBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NavBar = () => {
  const navigation = useNavigation();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    try {
      // Remove the authentication token from AsyncStorage
      await AsyncStorage.removeItem('authToken');
      
      // Redirect to the Auth screen (assuming 'Auth' is the name of your authentication screen)
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigateTo('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Shop')}>
        <Text>Shop</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Checkout')}>
        <Text>Checkout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Contact')}>
        <Text>Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Cart')}>
        <Text>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default NavBar;
