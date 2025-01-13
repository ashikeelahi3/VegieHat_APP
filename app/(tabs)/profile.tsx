import { View, Text, Button } from 'react-native'
import React from 'react'
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";

const handleSignOut = async () => {
  await signOut(FIREBASE_AUTH);
};


const profile = () => {
  
  return (
    <View>
      <Text>profile</Text>
      <Button title="Log Out" onPress={handleSignOut} />
    </View>
  )
}

export default profile