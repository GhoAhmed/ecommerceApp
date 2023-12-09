import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      return; // Don't send empty messages
    }

    const updatedMessages = [...messages, { id: messages.length + 1, text: newMessage, sender: 'user' }];
    setMessages(updatedMessages);
    setNewMessage('');

    // Scroll to the bottom when a new message is sent
    flatListRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={item.sender === 'user' ? styles.userMessageContainer : styles.botMessageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#95a5a6',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    maxWidth: '70%',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
});

export default ChatScreen;
