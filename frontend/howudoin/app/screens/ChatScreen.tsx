import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatScreen = ({ route }: { route: any }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);

  const { friendUsername } = route.params; // get friends username

  useEffect(() => {
    fetchMessages();
  }, [friendUsername]);

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        alert('User not authenticated. Please log in.');
        return;
      }
  
      const response = await axios.get(
        'http://10.0.2.2:8080/messages/getmessages',
        {
          headers: {
            Authorization: `Bearer ${token}`,  //add token to header
          },
          params: {
            receiverName: friendUsername,  // send parameters
          },
        }
      );
      console.log("Messages: ", response.data);  // check message
      setMessages(response.data);
    } catch (error) {
      console.error('could not load messages', error);
      alert('Unable to load messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim()) {
      alert('Mesaj boş olamaz!');
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        alert('User not authenticated. Please log in.');
        return;
      }
  
      const response = await axios.post('http://10.0.2.2:8080/messages/send', {
        receiverUsername: friendUsername,
        content: messageInput,
        // timestamp tr 
        timestamp: getTurkishDateTime(), 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // add new messsage
      setMessages([
        ...messages,
        {
          senderUsername: 'You',
          receiverUsername: friendUsername,
          content: messageInput,
          timestamp: getTurkishDateTime(), 
        },
      ]);
      setMessageInput('');
    } catch (error) {
      console.error('unable to send message', error);
      alert('unable to send messages pls try again.');
    }
  };
  
  
  const getTurkishDateTime = () => {
    const date = new Date();
  
    
    const turkishDateTime = new Intl.DateTimeFormat('tr-TR', {
      timeZone: 'Europe/Istanbul', 
      hour12: false,               
      weekday: 'long',             
      year: 'numeric',             
      month: 'long',               
      day: 'numeric',              
      hour: '2-digit',             
      minute: '2-digit',           
      second: '2-digit',           
    }).format(date);
  
    return turkishDateTime; 
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View style={styles.messageContainer}>
      <Text>{item.senderUsername}: {item.content}</Text>
      <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
    </View>
  );

  if (loading) {
    return <Text>Loading messages...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Chat with {friendUsername}</Text>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        value={messageInput}
        onChangeText={setMessageInput}
        placeholder="Message"
      />
      <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ChatScreen;
