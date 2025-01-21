import React, { useState, useEffect } from "react";
import { TextInput, Button, Text, View } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const { user, refreshUser } = useAuth(); // Access refreshUser function
  const router = useRouter();

  useEffect(() => {
    if (user && user.emailVerified) {
      router.replace("/"); // Redirect to home if authenticated and verified
    }
  }, [user, router]);

  const toggleLogin = () => {
    setNewUser(!newUser);
    setError("");
    setShowResendVerification(false);
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      alert("User registered! A verification email has been sent. Please verify your email before signing in.");

      setNewUser(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      // Refresh the user's state to detect email verification status
      await refreshUser();

      if (!user.emailVerified) {
        setShowResendVerification(true);
        alert("Please verify your email before signing in.");
        return;
      }

      alert("Signed in successfully!");
      setEmail("");
      setPassword("");
      setError("");
      setShowResendVerification(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      if (FIREBASE_AUTH.currentUser) {
        await sendEmailVerification(FIREBASE_AUTH.currentUser);
        alert("Verification email sent again!");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-gray-50">
      <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-4">
          {newUser ? "Sign Up" : "Sign In"}
        </Text>
        <TextInput
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text className="text-red-500 text-center mb-4">{error}</Text> : null}
        <Button title={newUser ? "Sign Up" : "Sign In"} onPress={newUser ? handleSignUp : handleSignIn} />
        <Text className="text-center text-gray-600 mt-4">
          {newUser ? "Already have an account? " : "New to VegieHat? "}
          <Text className="text-blue-500" onPress={toggleLogin}>
            {newUser ? "Sign In" : "Sign Up"}
          </Text>
        </Text>
        {showResendVerification && (
          <Text className="text-blue-500 text-center mt-4" onPress={resendVerificationEmail}>
            Resend Verification Email
          </Text>
        )}
      </View>
    </View>
  );
};

export default AuthScreen;
