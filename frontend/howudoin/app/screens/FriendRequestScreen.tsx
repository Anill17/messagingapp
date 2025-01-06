import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendRequestScreen = () => {
  const [receiverName, setReceiverName] = useState('');
  const [loading, setLoading] = useState(false);

  const sendFriendRequest = async () => {
    if (!receiverName) {
      Alert.alert('Error', 'Please enter a username to send a friend request.');
      return;
    }

    setLoading(true);

    try {
      // Get JWT token from AsyncStorage
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        Alert.alert('Error', 'You are not authenticated.');
        return;
      }

      // API call
      const response = await axios.post(
        'http://10.0.2.2:8080/friends/add',
        { receiverName }, // data to send
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add JWT token to header
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Friend request sent successfully!');
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data); //Error message from the server
      } else {
        Alert.alert('Error', 'Unable to send friend request. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Friend Request</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={receiverName}
        onChangeText={setReceiverName}
      />
      <Button title={loading ? 'Sending...' : 'Send Request'} onPress={sendFriendRequest} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default FriendRequestScreen;
