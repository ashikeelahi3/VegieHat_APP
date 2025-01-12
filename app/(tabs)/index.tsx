import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useSession } from '../../ctx';

export default function Index() {
  const { signOut } = useSession();
  return (
    <View className="h-screen w-screen flex items-center justify-center">
      <Text className="text-blue-600">Edit app/index.tsx to edit this screen.</Text>
      <Link href="/Login">Login</Link>
      <Link href="/about">About</Link>
      <Text
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
