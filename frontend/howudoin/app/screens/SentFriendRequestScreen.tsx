import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SentFriendRequestsScreen = () => {
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSentFriendRequests();
  }, []);

  const fetchSentFriendRequests = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get('http://10.0.2.2:8080/friends/getArkadaslikIstekleri2', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSentRequests(response.data);
    } catch (error) {
      Alert.alert('error', 'There was a problem receiving sent friend requests.');
    } finally {
      setLoading(false);
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
      <Text style={styles.title}>Sent Friend Requests</Text>
      {sentRequests.length === 0 ? (
        <Text style={styles.noRequests}>There are no friend requests sent.</Text>
      ) : (
        <FlatList
          data={sentRequests}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.requestItem}>
              <Text style={styles.requestText}>{item}</Text>
              <Text style={styles.statusText}>Still not answered</Text>
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
  statusText: {
    fontSize: 14,
    color: '#FF5722',
    fontStyle: 'italic',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SentFriendRequestsScreen;
