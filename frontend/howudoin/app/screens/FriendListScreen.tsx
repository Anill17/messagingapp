import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  FriendList: undefined;
  Chat: { friendUsername: string };
};

const FriendListScreen = () => {
  const [friends, setFriends] = useState<string[]>([]); 
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'FriendList'>>();

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        alert('User not authenticated. Please log in.');
        return;
      }

      const response = await axios.get('http://10.0.2.2:8080/friends', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check API response and update setFriends array
      console.log('Friends data from API:', response.data);
      setFriends(response.data); // Returns an array like ['anıl', 'melis']
    } catch (error) {
      alert('Unable to fetch friends list. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFriend = (friendUsername: string) => {
    navigation.navigate('Chat', { friendUsername });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends List</Text>
      {friends.length > 0 ? (
        <FlatList
          data={friends}
          keyExtractor={(item, index) => item.toString()} // keyExtractor'ı check
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.friendItem} onPress={() => handleSelectFriend(item)}>
              <Text style={styles.friendName}>{item}</Text> {/* item is string */}
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>You have no friends yet. Start adding some!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  friendItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  friendName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
  },
});

export default FriendListScreen;
