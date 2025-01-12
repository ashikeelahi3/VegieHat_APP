import React, { useState } from 'react';
import { TextInput, Button, Text, View, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FIREBASE_AUTH } from '@/FirebaseConfig';

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState(false);

  const toggleLogin = () => {
    setNewUser(!newUser);
    setError("");
  };


  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      alert("User registered!");
      setNewUser(false)
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      alert("Signed in!");
      setEmail("")
      setPassword("")
      setError("")
    } catch (err: any) {
      setError(err.message);
    }
  };


  return (
    <View className="h-screen w-screen p-2">
      <View className='p-8 m-4'>
        <Text className='text-3xl font-bold my-2 text-center'>{newUser ? "Sign Up Here" : "Sign In Here"}</Text>
        <TextInput
          className="border border-gray-500 mb-2 p-2 rounded"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border border-gray-500 mb-2 p-2 rounded"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <Button title={newUser ? "Sign Up" : "Sign In"} onPress={newUser ? handleSignUp : handleSignIn} />
        <Text className="text-lg mt-3">
          {newUser ? "Already have an account? " : "New to VegieHat? "}
          <Text className="text-blue-500" onPress={toggleLogin}>
            {newUser ? "Sign In" : "Sign Up"}
          </Text>
        </Text>
      </View>
      
    </View>
  );
};

export default AuthScreen;
