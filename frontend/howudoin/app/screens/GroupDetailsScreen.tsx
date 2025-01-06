import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroupDetailsScreen = ({ route }: { route: any }) => {
  const { groupId } = route.params; // String type ID
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  const fetchGroupDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get(`http://10.0.2.2:8080/groups/details/${groupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGroup(response.data);
    } catch (error) {
      console.error('Failed to load group details:', error);
      Alert.alert('Error', 'Could not load group details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderMember = ({ item }: { item: string }) => (
    <View style={styles.memberItemContainer}>
      <Text style={styles.memberItem}>{item}</Text>
    </View>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Details loading...</Text>;
  }

  if (!group) {
    return <Text style={styles.errorText}>Group not found or you do not have permission to access details.</Text>;
  }

  const renderHeader = () => (
    <View style={styles.card}>
      <Text style={styles.title}>{group.groupName}</Text>
      <Text style={styles.subtitle}>Group ID: {group.groupId}</Text>
      <Text style={styles.subtitle}>Creation Time: {group.createdAt}</Text>
    
    </View>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={group.members}
      renderItem={renderMember}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // iOS Shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  memberTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  memberItemContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  memberItem: {
    fontSize: 16,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default GroupDetailsScreen;
