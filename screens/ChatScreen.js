import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { addDoc, getFirestore, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Audio } from 'expo-av';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../config/firebase';

const firestore = getFirestore(firebase);

const ChatScreen = ({ route }) => {
  const { contact } = route.params;
  const userId = contact.id.toString();
  const userName = contact.name;
  const [messages, setMessages] = useState([]);
  const chatRef = collection(firestore, 'chats', userId, 'messages');
  const [sound, setSound] = useState();

  useEffect(() => {
    const unsubscribe = onSnapshot(chatRef, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt ? data.createdAt.toDate() : null,
          user: data.user,
        };
      });

      // Sort messages by createdAt in descending order
      messages.sort((a, b) => b.createdAt - a.createdAt);

      setMessages(messages);
    });

    return () => unsubscribe();
  }, [userId, chatRef]);

  const onSend = async (newMessages) => {
    try {
      await Promise.all(
        newMessages.map(async (message) => {
          await addDoc(chatRef, {
            text: message.text,
            createdAt: serverTimestamp(),
            user: {
              _id: userId,
              name: userName,
            },
          });
        })
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const startCall = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../sounds/dark-mode.mp3'));
    setSound(sound);
    await sound.playAsync();
  };

  const endCall = async () => {
    if (sound) {
      sound.stopAsync();
      setSound(null);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Custom header with phone call icon */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
        {/* Add UI elements for the call button */}
        <TouchableOpacity onPress={startCall}>
          <Ionicons name="ios-call" size={30} color="green" />
        </TouchableOpacity>
        {/* Add UI elements for ending the call */}
        {sound && (
          <TouchableOpacity onPress={endCall}>
            <Ionicons name="ios-close" size={30} color="red" />
          </TouchableOpacity>
        )}
      </View>
      {/* Display the recipient's name */}
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{userName}</Text>
      {/* GiftedChat component remains unchanged */}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: userId, name: userName }}
      />
    </View>
  );
};

export default ChatScreen;
