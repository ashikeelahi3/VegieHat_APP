import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User, reload } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>; // Add a function to refresh the user
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoredUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    fetchStoredUser();

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await AsyncStorage.setItem("user", JSON.stringify(currentUser));
      } else {
        setUser(null);
        await AsyncStorage.removeItem("user");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Function to refresh the user's state
  const refreshUser = async () => {
    if (FIREBASE_AUTH.currentUser) {
      await reload(FIREBASE_AUTH.currentUser); // Reload the user's state
      setUser(FIREBASE_AUTH.currentUser); // Update the user state
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
