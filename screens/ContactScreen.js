import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { fetchUsers } from '../services/api';

const ContactScreen = () => {
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Adjust the key based on your setup
        const data = await fetchUsers(userId);
        setContacts(data.users);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
  
    fetchContacts();
  }, []);

  const renderContactItem = ({ item }) => {
    if (!item || typeof item !== 'object' || !item.name) {
      return null;
    }

    const handleChatPress = async () => {
      const userType = await AsyncStorage.getItem('type'); // Retrieve userType again
      if (item && item.id) {
        navigation.navigate('Chat', { contact: item, userType });
      } else {
        console.error('Invalid contact object:', item);
        // Handle the error, e.g., show an alert or log it
      }
    };

    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={handleChatPress}
      >
        <Text style={styles.contactName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderContactItem}
        ListEmptyComponent={() => <Text>No contacts available</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contactItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactScreen;
