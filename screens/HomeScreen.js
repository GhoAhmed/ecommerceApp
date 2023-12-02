// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToProductScreen = () => {
    navigation.navigate('Product');
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Product" onPress={goToProductScreen} />
    </View>
  );
};

export default HomeScreen;
