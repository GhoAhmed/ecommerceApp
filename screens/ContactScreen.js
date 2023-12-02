// screens/ContactScreen.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        {/* Navigation buttons go here */}
        {/* ... */}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text>Contact Us</Text>

        {/* Contact Form */}
        <TextInput placeholder="Your Name" style={styles.input} />
        <TextInput placeholder="Your Email" style={styles.input} />
        <TextInput placeholder="Your Message" multiline numberOfLines={4} style={styles.input} />

        <Button title="Submit" onPress={() => alert('Form submitted!')} />

        {/* Map */}
        <View style={styles.mapContainer}>
          {/* Add your map component here */}
          <Text>Map goes here</Text>
        </View>

        {/* Additional Description */}
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
        </Text>
      </View>

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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  content: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
  },
  mapContainer: {
    height: 200, // Adjust the height based on your design
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    marginVertical: 10,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default ContactScreen;
