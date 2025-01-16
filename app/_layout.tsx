import React from "react";
import { Stack } from "expo-router";
import { LogBox, StatusBar } from "react-native";
import { AuthProvider } from "@/context/AuthContext";

// Import your global CSS file
import "../global.css";
import { ItemsProvider } from "@/context/ItemsContext";

LogBox.ignoreAllLogs(true)

export default function RootLayout() {
  return (
    <AuthProvider>
      {/* <StatusBar style="light" /> */}
      <ItemsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="+not-found" 
          options={{
            headerShown: false
          }}
        />
      </Stack>
      </ItemsProvider>
    </AuthProvider>
  )
}