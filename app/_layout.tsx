import React from "react";
import { Stack } from "expo-router";
import { LogBox, StatusBar } from "react-native";

// Import your global CSS file
import "../global.css";

LogBox.ignoreAllLogs(true)

export default function RootLayout() {
  return (
    <>
      {/* <StatusBar style="light" /> */}
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
    </>
  )
}