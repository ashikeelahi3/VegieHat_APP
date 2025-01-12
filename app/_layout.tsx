import React, { useEffect } from "react";
import { usePathname, useGlobalSearchParams, Slot } from "expo-router";
import { LogBox, StatusBar } from "react-native";
import analytics from '@react-native-firebase/analytics';
import { SessionProvider } from '../ctx';

// Import your global CSS file
import "../global.css";

LogBox.ignoreAllLogs(true)

export default function RootLayout() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  useEffect(() => {
    analytics().logEvent('screen_view', { screen_name: pathname, params })
  }, [usePathname, params])
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  )
}