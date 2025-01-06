import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // We get the token from AsyncStorage
    const getToken = async () => {
      const savedToken = await AsyncStorage.getItem("jwtToken");
      setToken(savedToken);
    };

    getToken();
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.buttonContainer}>
        <Button
          title="Send friend requests"
          onPress={() => navigation.navigate("FriendRequest")}
          color="#4CAF50" // button color 
        />
         <Button
          title="List friends"
          onPress={() => navigation.navigate("FriendList")}
          color="#4CAF50" 
        />
        <Button
          title="Accept friend request"
          onPress={() => navigation.navigate("FriendAccept")}
          color="#4CAF50" 
        />
        <Button
          title="See your friend requests"
          onPress={() => navigation.navigate("SentFriendRequest")}
          color="#4CAF50" 
        />
         <Button
          title="Create Group"
          onPress={() => navigation.navigate("CreateGroup")}
          color="#4CAF50" 
        />
         <Button
          title="See your groups"
          onPress={() => navigation.navigate("GroupList")}
          color="#4CAF50" 
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff", // light blue background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default HomeScreen;
