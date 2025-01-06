import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateGroupScreen = () => {
  const [groupName, setGroupName] = useState('');
  const [friends, setFriends] = useState<string[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFriends();
  }, []);

  // get friends list
  const fetchFriends = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get('http://10.0.2.2:8080/friends', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFriends(response.data);
    } catch (error) {
      console.error('Friend list could not be loaded:', error);
      Alert.alert('Error', 'Friend list could not be loaded.');
    } finally {
      setLoading(false);
    }
  };

  // Grup oluşturma işlemi
  const createGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert('alert', 'Group name cannot be left blank.');
      return;
    }

    if (selectedFriends.length === 0) {
      Alert.alert('alert', 'You must add at least one member to the group.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await axios.post(
        'http://10.0.2.2:8080/groups/create',
        {
          groupName,
          members: selectedFriends,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('successful', response.data);
      setGroupName('');
      setSelectedFriends([]);
    } catch (error) {
      console.error('Group could not be created:', error);
      Alert.alert('Error', 'Group creation failed. Please try again..');
    }
  };

  // Managing friend selection
  const toggleFriendSelection = (friend: string) => {
    if (selectedFriends.includes(friend)) {
      setSelectedFriends(selectedFriends.filter(f => f !== friend));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  // Function that renders the friend list element
  const renderFriendItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.friendItem,
        selectedFriends.includes(item) && styles.selectedFriendItem,
      ]}
      onPress={() => toggleFriendSelection(item)}
    >
      <Text style={styles.friendText}>{item}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text>Loading friends...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Group</Text>
      <TextInput
        style={styles.input}
        placeholder="Grup Adı"
        value={groupName}
        onChangeText={setGroupName}
      />
      <Text style={styles.subtitle}>Select Friends:</Text>
      <FlatList
        data={friends}
        renderItem={renderFriendItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.createButton} onPress={createGroup}>
        <Text style={styles.createButtonText}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  friendItem: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  selectedFriendItem: {
    backgroundColor: '#cce5ff',
  },
  friendText: {
    fontSize: 16,
  },
  createButton: {
    marginTop: 16,
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateGroupScreen;
