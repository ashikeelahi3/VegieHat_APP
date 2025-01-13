import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
const saveUserData = async (userData: any) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    console.log('User data saved');
  } catch (e) {
    console.error('Failed to save user data', e);
  }
};

// Retrieve data
const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to fetch user data', e);
  }
};

// Remove data (Logout example)
const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('user');
    console.log('User data cleared');
  } catch (e) {
    console.error('Failed to clear user data', e);
  }
};
