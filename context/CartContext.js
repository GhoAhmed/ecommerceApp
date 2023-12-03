// context/CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart count from AsyncStorage on app startup
  const loadCartCount = async () => {
    try {
      const storedCount = await AsyncStorage.getItem('cartCount');
      return storedCount !== null ? parseInt(storedCount, 10) : 0;
    } catch (error) {
      console.error('Error loading cart count from AsyncStorage:', error);
      return 0;
    }
  };

  const loadCartItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      return storedItems !== null ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error('Error loading cart items from AsyncStorage:', error);
      return [];
    }
  };

  const initialState = { count: 0, items: [] };

  useEffect(() => {
    Promise.all([loadCartCount(), loadCartItems()])
      .then(([initialCount, initialItems]) => {
        dispatch({ type: 'SET_INITIAL_STATE', count: initialCount, items: initialItems });
      })
      .catch((error) => console.error('Error setting initial state:', error));
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'ADD_TO_CART':
        const updatedItems = [...state.items, action.item];
        return { ...state, count: state.count + 1, items: updatedItems };
      case 'SET_INITIAL_STATE':
        return { count: action.count, items: action.items };
      case 'CLEAR_CART':
        return { count: 0, items: [] };
      case 'LOGOUT':
        return { count: 0, items: [] };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Save cart count and items to AsyncStorage whenever they change
    const saveCartState = async () => {
      try {
        await AsyncStorage.setItem('cartCount', state.count.toString());
        await AsyncStorage.setItem('cartItems', JSON.stringify(state.items));
      } catch (error) {
        console.error('Error saving cart state to AsyncStorage:', error);
      }
    };

    saveCartState();
  }, [state.count, state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
