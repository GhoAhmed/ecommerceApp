import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signin, signup } from '../services/api';
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
       // Check if the signin was successful
    if (result.token) {
      // Assuming your API returns a token upon successful signin
      const { token } = result;

      // Store the authentication token in AsyncStorage
      await AsyncStorage.setItem('authToken', token);

      // Redirect to HomeScreen upon successful signin
      navigation.navigate('Home');
    } else {
      // Display an alert for incorrect email or password
      Alert.alert('Signin Error', 'Invalid email or password. Please try again.');
    }
  } catch (error) {
    console.error('Error signing in:', error);
    // Display a generic error message to the user
    Alert.alert('Signin Error', 'An error occurred during signin. Please try again.');
  }
  };

  const handleSignup = async () => {
    try {
      const result = await signup(name, email, password);

      // Check for error response from the API
      if (result.error) {
        Alert.alert('Signup Error', result.error);
        return;
      }

      // Assuming your API returns a token upon successful signup
      const { token } = result;

      // Store the authentication token in AsyncStorage
      await AsyncStorage.setItem('authToken', token);

      // Redirect to HomeScreen upon successful signup
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Signup Error', 'An error occurred during signup. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Your Logo Here */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {showSignin ? (
        // Signin Form
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Sign In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button title="Sign In" onPress={handleSignin} />
          <TouchableOpacity onPress={() => setShowSignin(false)}>
            <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Signup Form
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button title="Sign Up" onPress={handleSignup} />
          <TouchableOpacity onPress={() => setShowSignin(true)}>
            <Text style={styles.linkText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
    width: '80%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  linkText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default Auth;