import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendAcceptScreen = () => {
  const [friendRequests, setFriendRequests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get('http://10.0.2.2:8080/friends/getArkadaslikIstekleri', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFriendRequests(response.data);
    } catch (error) {
      Alert.alert('Hata', 'Arkadaşlık isteklerini alırken bir sorun oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const acceptFriendRequest = async (receiverName: string) => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await axios.post(
        'http://10.0.2.2:8080/friends/accept',
        { receiverName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert('successful', response.data);
      fetchFriendRequests();
    } catch (error) {
      Alert.alert('error', 'There was a problem approving your friend request.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incoming Friend Requests</Text>
      {friendRequests.length === 0 ? (
        <Text style={styles.noRequests}>There is no friend reques.</Text>
      ) : (
        <FlatList
          data={friendRequests}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.requestItem}>
              <Text style={styles.requestText}>{item}</Text>
              <Button
                title="Onayla"
                onPress={() => acceptFriendRequest(item)}
                color="#4CAF50"
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  noRequests: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
  },
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requestText: {
    fontSize: 16,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FriendAcceptScreen;
