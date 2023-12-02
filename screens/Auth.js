// src/components/Auth.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signin, signup } from '../services/api'; // Import the API functions
import AsyncStorage from '@react-native-async-storage/async-storage';

const Auth = () => {
  const [showSignin, setShowSignin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Check for authentication token on component mount
    checkAuthToken();
  }, []);

  const checkAuthToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken) {
        // If authToken exists, redirect to HomeScreen
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error checking authentication token:', error);
    }
  };

  const handleSignin = async () => {
    try {
      const result = await signin(email, password);
      Alert.alert('Signin Result', JSON.stringify(result));

      // Assuming your API returns a token upon successful signin
      const { token } = result;

      // Store the authentication token in AsyncStorage
      await AsyncStorage.setItem('authToken', token);

      // Redirect to HomeScreen upon successful signin
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const result = await signup(name, email, password);

      // Handle the result, e.g., log it
      console.log('Signup Result:', result);

      // Redirect to HomeScreen upon successful signup
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Your Logo Here */}
      <Image source={require('../assets/logo.png')} style={{ width: 50, height: 50, marginBottom: 20 }} />

      {showSignin ? (
        // Signin Form
        <View style={{ marginTop: 20, width: '80%' }}>
          <Text>Sign In</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button title="Sign In" onPress={handleSignin} />
          <TouchableOpacity onPress={() => setShowSignin(false)}>
            <Text style={{ marginTop: 20, color: 'blue' }}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Signup Form
        <View style={{ marginTop: 20, width: '80%' }}>
          <Text>Sign Up</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button title="Sign Up" onPress={handleSignup} />
          <TouchableOpacity onPress={() => setShowSignin(true)}>
            <Text style={{ marginTop: 20, color: 'blue' }}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Auth;
