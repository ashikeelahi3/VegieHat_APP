import React from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 mb-4">404 - Page Not Found</Text>
      <Text className="text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
      </Text>
      <Link href="/" className="text-blue-600 underline text-lg">
        Go Back to Home
      </Link>
      
    </View>
  );
}