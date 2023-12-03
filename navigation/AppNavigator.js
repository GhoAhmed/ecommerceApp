import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from '../screens/Auth';
import HomeScreen from '../screens/HomeScreen';
import { CartProvider } from '../context/CartContext';
import CheckoutScreen from '../screens/CheckoutScreen';
import ContactScreen from '../screens/ContactScreen';
import Cart from '../screens/Cart';
import ShopScreen from '../screens/ShopScreen';
import ProductDetails from '../screens/ProductDetails';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
       <CartProvider>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Shop" component={ShopScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Contact" component={ContactScreen} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
