import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ContactScreen = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
    // Add more contacts as needed
  ]);

  const navigation = useNavigation();

  const handleChatPress = (contact) => {
    // Navigate to the ChatScreen and pass the selected contact
    navigation.navigate('Chat', { contact });
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity style={styles.contactItem} onPress={() => handleChatPress(item)}>
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderContactItem}
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
