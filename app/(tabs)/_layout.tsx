import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00f",  // Change the active tab bar color
        headerStyle: {
          // backgroundColor: "#25292e",  // Change the background color of the header
        },
        headerShadowVisible: false,
        headerTintColor: "#000",
        tabBarStyle: {
          // backgroundColor: "#25292e"
        }
      }}
    >
      <Tabs.Screen name="index" 
        options={{
          headerTitle: "VegieHat",
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
              name={focused ? "home-sharp":"home-outline"} 
              color={color}
              size={30}
            />
        ),
        }}
      />
      <Tabs.Screen name="about" 
        options={{
          headerTitle: "About",
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
              name={focused ? "information-circle":"information-circle-outline"} 
              color={color}
              size={30}
            />
        ),
        }}
      />
      <Tabs.Screen 
        name="not-found" 
        options={{
          headerTitle: "Page Not Found"
        }}
      />
    </Tabs>
  )
}