import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchAdminUsers } from '../services/api'; // Update with the correct path

const ContactScreen = () => {
  const [admins, setAdmins] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch admin users when the component mounts
    const fetchAdmins = async () => {
      try {
        const data = await fetchAdminUsers();
        setAdmins(data.admins);
      } catch (error) {
        // Handle error
        console.error('Error fetching admin users:', error);
      }
    };
  
    fetchAdmins();
  }, []);
  

  const handleChatPress = (admin) => {
    // Navigate to the ChatScreen and pass the selected admin
    navigation.navigate('Chat', { admin });
  };

  const renderAdminItem = ({ item }) => {
  
    if (!item || typeof item !== 'object' || !item.name) {
      return null; // or handle the case appropriately
    }
  
    return (
      <TouchableOpacity
        style={styles.adminItem}
        onPress={() => handleChatPress(item)}
      >
        <Text style={styles.adminName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={admins}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAdminItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  adminItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  adminName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactScreen;
