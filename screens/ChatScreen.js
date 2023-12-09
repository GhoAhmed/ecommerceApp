import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
// Update this import statement
import { getFirestore, collection, onSnapshot, add, serverTimestamp } from 'firebase/firestore';


// Assuming 'firebase' is your initialized Firebase instance
import firebase from '../config/firebase';

const firestore = getFirestore(firebase);

const ChatScreen = ({ route }) => {
  const { admin } = route.params;
  const userId = 'yourUserId'; // Replace with your actual user ID
  const userName = 'yourUserName'; // Replace with your actual user name
  const [messages, setMessages] = useState([]);
  const chatRef = collection(firestore, 'chats', userId, 'messages');

  useEffect(() => {
    const unsubscribe = onSnapshot(chatRef, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user,
        };
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, [userId, chatRef]);

  const onSend = async (newMessages) => {
    try {
      await Promise.all(
        newMessages.map(async (message) => {
          await add(chatRef, {
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
      // Handle the error, e.g., show an alert or log it
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{ _id: userId, name: userName }}
    />
  );
};

export default ChatScreen;
