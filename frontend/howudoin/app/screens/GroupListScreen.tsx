import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroupListScreen = ({ navigation }: { navigation: any }) => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await axios.get('http://10.0.2.2:8080/groups/getMyGroups', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGroups(response.data);
    } catch (error) {
      console.error('Groups could not be loaded:', error);
      Alert.alert('Error', 'Groups could not be loaded, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openGroupMenu = (group: any) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  const handleGroupDetails = () => {
    if (selectedGroup) {
      setModalVisible(false);
      navigation.navigate('GroupDetails', { groupId: selectedGroup.id }); // ID send
    }
  };

  const renderGroupItem = ({ item }: { item: any }) => (
    <View style={styles.groupItemContainer}>
      <TouchableOpacity
        style={styles.groupItem}
        onPress={() => navigation.navigate('GroupChat', { groupId: item.id, groupName: item.groupName })}
      >
        <Text style={styles.groupName}>{item.groupName}</Text>
        <Text style={styles.memberCount}>Members: {item.members.length}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openGroupMenu(item)} style={styles.menuButton}>
        <Text style={styles.menuButtonText}>⋮</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <Text>Groups are loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Groups</Text>
      {groups.length > 0 ? (
        <FlatList
          data={groups}
          renderItem={renderGroupItem}
          keyExtractor={(item) => item.id} // ID is string
        />
      ) : (
        <Text>You don't have a group you're a member of yet.</Text>
      )}

      {/* Modal for Group Menu */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleGroupDetails} style={styles.modalOption}>
            <Text style={styles.modalOptionText}>Group Details</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  groupItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  groupItem: {
    flex: 1,
    padding: 12,
  },
  menuButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 20,
    color: '#555',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  memberCount: {
    fontSize: 14,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: 12,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default GroupListScreen;
