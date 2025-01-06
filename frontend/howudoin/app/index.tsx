import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // HomeScreen is imported
import RegisterScreen from './screens/Register';
import LoginScreen from './screens/LoginScreen';
import FriendRequestScreen from './screens/FriendRequestScreen';
import FriendListScreen from './screens/FriendListScreen';
import FriendAcceptScreen from './screens/FriendAcceptScreen';
import SentFriendRequestsScreen from './screens/SentFriendRequestScreen';
import ChatScreen from './screens/ChatScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import GroupListScreen from './screens/GroupListScreen';
import GroupDetailsScreen from './screens/GroupDetailsScreen';
import GroupChatScreen from './screens/GroupChatScreen';
; // RegisterScreen is imported

const Stack = createStackNavigator();

export default function Index() {
  return (
    
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="FriendRequest" component={FriendRequestScreen} />
        <Stack.Screen name="FriendList" component={FriendListScreen} />
        <Stack.Screen name="FriendAccept" component={FriendAcceptScreen} />
        <Stack.Screen name="SentFriendRequest" component={SentFriendRequestsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
        <Stack.Screen name="GroupList" component={GroupListScreen} />
        <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
        <Stack.Screen name="GroupChat" component={GroupChatScreen} />
      </Stack.Navigator>

  );
}
