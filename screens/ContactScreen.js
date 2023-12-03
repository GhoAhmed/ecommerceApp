import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Assuming you have a function to send the message to the server
    // Replace the following line with your API call or message handling logic
    sendMessageToServer({ name, email, message });

    // Optionally, you can clear the form fields after sending the message
    setName('');
    setEmail('');
    setMessage();

    Alert.alert('Success', 'Message sent successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Your Message"
        value={message}
        onChangeText={(text) => setMessage(text)}
        multiline
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
        <Text style={styles.sendButtonText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  messageInput: {
    height: 100,
  },
  sendButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  sendButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ContactScreen;