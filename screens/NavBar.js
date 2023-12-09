// components/NavBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../context/CartContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavBar = () => {
  const navigation = useNavigation();
  const { state: { count }, dispatch } = useCart();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    try {
      // Remove the authentication token from AsyncStorage
      await AsyncStorage.removeItem('authToken');
      
      // Dispatch the 'LOGOUT' action to clear the cart
      dispatch({ type: 'LOGOUT' });

      // Redirect to the Auth screen (assuming 'Auth' is the name of your authentication screen)
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigateTo('Home')}>
        <Icon name="home" size={30} color="#3498db" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Shop')}>
        <Icon name="th-large" size={30} color="#3498db" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Contact')}>
        <Icon name="phone" size={30} color="#3498db" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateTo('Checkout')}>
        <View style={styles.cartContainer}>
          <Icon name="shopping-bag" size={30} color="#3498db" />
          {count > 0 && <Text style={styles.cartCount}>{count}</Text>}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Icon name="sign-out" size={30} color="#3498db" />
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
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartCount: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default NavBar;
