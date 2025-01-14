import { View, Text, Button } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleSignOut = async () => {
  try {
    await signOut(FIREBASE_AUTH);
    await AsyncStorage.removeItem("user");
    alert("Logged out!");
  } catch (e) {
    alert("Error logging out");
  }
};

const Profile = () => {
  return (
    <View className="w-screen h-screen flex items-center justify-center">
      <Button title="Log Out" onPress={handleSignOut} />
    </View>
  );
};

export default Profile;
